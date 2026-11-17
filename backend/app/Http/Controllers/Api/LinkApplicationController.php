<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinkApplicationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:80'],
            'email' => ['nullable', 'email', 'max:255'],
            'location' => ['required', 'string', 'max:150'],
            'education' => ['required', 'string', 'max:180'],
            'specialty' => ['required', 'string', 'max:180'],
            'experience' => ['nullable', 'string', 'max:120'],
            'opportunity' => ['required', 'string', 'max:255'],
            'work_type' => ['nullable', 'string', 'max:100'],
            'bio' => ['nullable', 'string', 'max:4000'],
            'consent' => ['accepted'],
        ]);

        DB::table('link_applications')->insert([
            'full_name' => $data['full_name'], 'phone' => $data['phone'], 'email' => $data['email'] ?? null,
            'location' => $data['location'], 'education' => $data['education'], 'specialty' => $data['specialty'],
            'experience' => $data['experience'] ?? null, 'opportunity' => $data['opportunity'],
            'work_type' => $data['work_type'] ?? null, 'bio' => $data['bio'] ?? null, 'status' => 'new',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        return response()->json(['ok' => true], 201);
    }
}
