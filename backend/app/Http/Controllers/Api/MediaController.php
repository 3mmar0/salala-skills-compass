<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MediaController extends Controller
{
    private const IMAGE_MAX_KB = 2048;

    private const GIF_MAX_KB = 1536;

    private const VIDEO_PDF_MAX_KB = 51200;

    private const MAX_IMAGE_EDGE = 1920;

    public function store(Request $request)
    {
        if (!$request->hasFile('file')) {
            $code = $_FILES['file']['error'] ?? null;
            $message = match ($code) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'حجم الملف أكبر من حد الرفع على الخادم (ارفع ملفًا أصغر من 50 ميجابايت).',
                UPLOAD_ERR_PARTIAL => 'تم رفع جزء من الملف فقط. أعد المحاولة.',
                UPLOAD_ERR_NO_FILE => 'لم يتم اختيار ملف للرفع.',
                default => 'لم يستلم الخادم الملف. تحقق من حجم الفيديو أو إعدادات الرفع.',
            };

            return response()->json(['message' => $message], 422);
        }

        $data = $request->validate([
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,webm,pdf', 'max:'.self::VIDEO_PDF_MAX_KB],
            'alt' => ['nullable', 'string', 'max:255'],
        ], [
            'file.required' => 'اختر ملفًا للرفع.',
            'file.mimes' => 'الصيغة غير مدعومة. استخدم JPG/PNG/WebP/GIF أو MP4/WebM أو PDF.',
            'file.max' => 'حجم الملف أكبر من 50 ميجابايت.',
        ]);

        /** @var UploadedFile $file */
        $file = $data['file'];
        $mime = (string) $file->getMimeType();
        $this->assertSizeForMime($file, $mime);

        $directory = 'cms/'.now()->format('Y/m');
        $optimized = $this->optimizeStillImage($file, $mime);

        if ($optimized !== null) {
            [$binary, $extension, $mime, $size] = $optimized;
            $path = $directory.'/'.Str::random(40).'.'.$extension;
            Storage::disk('public')->put($path, $binary);
        } else {
            $path = $file->store($directory, 'public');
            $size = $file->getSize();
        }

        // Serve uploads through Laravel instead of a public storage symlink.
        // Hostinger blocks symlinks pointing outside the document root.
        $url = rtrim($request->getSchemeAndHttpHost(), '/').'/api/media/'.$path;
        $id = DB::table('media')->insertGetId([
            'path' => $path,
            'url' => $url,
            'mime_type' => $mime,
            'size' => $size,
            'alt' => $data['alt'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(DB::table('media')->find($id), 201);
    }

    public function show(string $path)
    {
        abort_unless(Storage::disk('public')->exists($path), 404);

        return response()->file(Storage::disk('public')->path($path), [
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'Accept-Ranges' => 'bytes',
        ]);
    }

    private function assertSizeForMime(UploadedFile $file, string $mime): void
    {
        $kb = (int) ceil($file->getSize() / 1024);

        if ($mime === 'image/gif' && $kb > self::GIF_MAX_KB) {
            throw ValidationException::withMessages([
                'file' => ['حجم الـ GIF أكبر من 1.5 ميجابايت. للرسوم المتحركة استخدم فيديو MP4/WebM أخف.'],
            ]);
        }

        if (str_starts_with($mime, 'image/') && $mime !== 'image/gif' && $kb > self::IMAGE_MAX_KB) {
            throw ValidationException::withMessages([
                'file' => ['حجم الصورة أكبر من 2 ميجابايت. ارفع JPG/WebP مضغوطًا.'],
            ]);
        }
    }

    /**
     * Resize and convert still images to WebP when GD is available.
     * GIFs/videos/PDFs are stored as uploaded.
     *
     * @return array{0:string,1:string,2:string,3:int}|null
     */
    private function optimizeStillImage(UploadedFile $file, string $mime): ?array
    {
        if (! str_starts_with($mime, 'image/') || $mime === 'image/gif') {
            return null;
        }

        if (! function_exists('imagecreatetruecolor') || ! function_exists('imagewebp')) {
            return null;
        }

        $raw = @file_get_contents($file->getRealPath());
        if ($raw === false) {
            return null;
        }

        $source = @imagecreatefromstring($raw);
        if ($source === false) {
            return null;
        }

        $width = imagesx($source);
        $height = imagesy($source);
        if ($width < 1 || $height < 1) {
            imagedestroy($source);

            return null;
        }

        $scale = min(1, self::MAX_IMAGE_EDGE / max($width, $height));
        $targetW = max(1, (int) round($width * $scale));
        $targetH = max(1, (int) round($height * $scale));

        $canvas = imagecreatetruecolor($targetW, $targetH);
        if ($canvas === false) {
            imagedestroy($source);

            return null;
        }

        imagealphablending($canvas, false);
        imagesavealpha($canvas, true);
        $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
        imagefilledrectangle($canvas, 0, 0, $targetW, $targetH, $transparent);
        imagecopyresampled($canvas, $source, 0, 0, 0, 0, $targetW, $targetH, $width, $height);

        ob_start();
        $ok = imagewebp($canvas, null, 82);
        $binary = ob_get_clean();
        imagedestroy($source);
        imagedestroy($canvas);

        if (! $ok || $binary === false || $binary === '') {
            return null;
        }

        return [$binary, 'webp', 'image/webp', strlen($binary)];
    }
}
