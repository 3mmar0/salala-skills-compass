<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
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
            // Images/GIFs stay moderate; videos/PDFs need a higher ceiling (50 MB).
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,mp4,webm,pdf', 'max:51200'],
            'alt' => ['nullable', 'string', 'max:255'],
        ], [
            'file.required' => 'اختر ملفًا للرفع.',
            'file.mimes' => 'الصيغة غير مدعومة. استخدم JPG/PNG/WebP/GIF أو MP4/WebM أو PDF.',
            'file.max' => 'حجم الملف أكبر من 50 ميجابايت.',
        ]);

        $file = $data['file'];
        $path = $file->store('cms/'.now()->format('Y/m'), 'public');
        // Serve uploads through Laravel instead of a public storage symlink.
        // Hostinger blocks symlinks pointing outside the document root.
        $url = rtrim($request->getSchemeAndHttpHost(), '/').'/api/media/'.$path;
        $id = DB::table('media')->insertGetId([
            'path' => $path,
            'url' => $url,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
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
}
