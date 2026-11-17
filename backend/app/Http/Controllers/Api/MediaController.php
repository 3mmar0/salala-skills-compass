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
        $data = $request->validate([
            // Images stay small on the client; videos need a higher ceiling (50 MB).
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,mp4,webm', 'max:51200'],
            'alt' => ['nullable', 'string', 'max:255'],
        ]);
        $file = $data['file'];
        $path = $file->store('cms/'.now()->format('Y/m'), 'public');
        // Serve uploads through Laravel instead of a public storage symlink.
        // Hostinger blocks symlinks pointing outside the document root.
        $url = rtrim($request->getSchemeAndHttpHost(), '/').'/api/media/'.$path;
        $id = DB::table('media')->insertGetId(['path'=>$path,'url'=>$url,'mime_type'=>$file->getMimeType(),'size'=>$file->getSize(),'alt'=>$data['alt']??null,'created_at'=>now(),'updated_at'=>now()]);
        return response()->json(DB::table('media')->find($id), 201);
    }

    public function show(string $path)
    {
        abort_unless(Storage::disk('public')->exists($path), 404);
        return response()->file(Storage::disk('public')->path($path), [
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
}
