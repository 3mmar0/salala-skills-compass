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
        $data = $request->validate(['file' => ['required','image','mimes:jpg,jpeg,png,webp','max:5120'], 'alt' => ['nullable','string','max:255']]);
        $file = $data['file'];
        $path = $file->store('cms/'.now()->format('Y/m'), 'public');
        $url = $request->getSchemeAndHttpHost().Storage::disk('public')->url($path);
        $id = DB::table('media')->insertGetId(['path'=>$path,'url'=>$url,'mime_type'=>$file->getMimeType(),'size'=>$file->getSize(),'alt'=>$data['alt']??null,'created_at'=>now(),'updated_at'=>now()]);
        return response()->json(DB::table('media')->find($id), 201);
    }
}
