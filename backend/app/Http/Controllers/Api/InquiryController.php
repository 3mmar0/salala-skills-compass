<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'source' => ['required', Rule::in(['contact', 'landscape', 'breed'])],
            'full_name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:80'],
            'email' => ['nullable', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
            'payload' => ['nullable', 'array'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $filePath = $request->hasFile('file')
            ? $request->file('file')->store('inquiries/'.now()->format('Y/m'), 'public')
            : null;

        $payload = $data['payload'] ?? [];
        if (!empty($data['message'])) {
            $payload['message'] = $data['message'];
        }

        DB::table('site_inquiries')->insert([
            'source' => $data['source'],
            'full_name' => $data['full_name'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'subject' => $data['subject'] ?? null,
            'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE),
            'file_path' => $filePath,
            'status' => 'new',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['ok' => true], 201);
    }

    public function index(Request $request)
    {
        $query = DB::table('site_inquiries')->orderByDesc('created_at');
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        if ($source = $request->query('source')) {
            $query->where('source', $source);
        }

        return response()->json(['inquiries' => $query->paginate(30)]);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->validate(['status' => ['required', 'in:new,contacted,accepted,closed']]);
        DB::table('site_inquiries')->where('id', $id)->update([
            'status' => $data['status'],
            'updated_at' => now(),
        ]);

        return response()->json(DB::table('site_inquiries')->find($id));
    }
}
