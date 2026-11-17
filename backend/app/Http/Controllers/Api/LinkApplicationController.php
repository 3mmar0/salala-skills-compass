<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LinkApplicationController extends Controller
{
    public function store(Request $request)
    {
        $intent = $request->input('intent', 'seeker');

        $rules = [
            'intent' => ['required', Rule::in(['seeker', 'employer'])],
            'full_name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:80'],
            'email' => ['nullable', 'email', 'max:255'],
            'consent' => ['accepted'],
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'linkedin' => ['nullable', 'url', 'max:500'],
        ];

        if ($intent === 'employer') {
            $rules = array_merge($rules, [
                'company_name' => ['required', 'string', 'max:255'],
                'hiring_needs' => ['required', 'string', 'max:4000'],
                'location' => ['nullable', 'string', 'max:150'],
                'work_type' => ['nullable', 'string', 'max:100'],
            ]);
        } else {
            $rules = array_merge($rules, [
                'location' => ['required', 'string', 'max:150'],
                'education' => ['required', 'string', 'max:180'],
                'specialty' => ['required', 'string', 'max:180'],
                'experience' => ['nullable', 'string', 'max:120'],
                'opportunity' => ['required', 'string', 'max:255'],
                'work_type' => ['nullable', 'string', 'max:100'],
                'bio' => ['nullable', 'string', 'max:4000'],
                'cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            ]);
        }

        $data = $request->validate($rules);
        $cvPath = $request->hasFile('cv')
            ? $request->file('cv')->store('cvs/'.now()->format('Y/m'), 'public')
            : null;

        DB::table('link_applications')->insert([
            'intent' => $data['intent'],
            'full_name' => $data['full_name'],
            'company_name' => $data['company_name'] ?? null,
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'location' => $data['location'] ?? '',
            'education' => $data['education'] ?? '',
            'specialty' => $data['specialty'] ?? '',
            'experience' => $data['experience'] ?? null,
            'opportunity' => $data['opportunity'] ?? ($data['company_name'] ?? 'طلب توظيف'),
            'work_type' => $data['work_type'] ?? null,
            'bio' => $data['bio'] ?? null,
            'linkedin' => $data['linkedin'] ?? null,
            'cv_path' => $cvPath,
            'hiring_needs' => $data['hiring_needs'] ?? null,
            'status' => 'new',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['ok' => true], 201);
    }

    public function index(Request $request)
    {
        $query = DB::table('link_applications')->orderByDesc('created_at');
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
        if ($intent = $request->query('intent')) {
            $query->where('intent', $intent);
        }

        return response()->json(['applications' => $query->paginate(30)]);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->validate(['status' => ['required', 'in:new,contacted,accepted,closed']]);
        DB::table('link_applications')->where('id', $id)->update([
            'status' => $data['status'],
            'updated_at' => now(),
        ]);

        return response()->json(DB::table('link_applications')->find($id));
    }
}
