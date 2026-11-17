<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EntrepreneurshipApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:80'],
            'email' => ['nullable', 'email', 'max:255'],
            'project_title' => ['nullable', 'string', 'max:255'],
            'stage' => ['nullable', 'string', 'max:120'],
            'idea' => ['required', 'string', 'max:5000'],
            'linkedin' => ['nullable', 'url', 'max:500'],
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'consent' => ['accepted'],
        ]);
        $validator->after(function ($v) use ($request) {
            if (!$request->filled('linkedin') && !$request->hasFile('cv')) {
                $v->errors()->add('linkedin', 'أضف رابط LinkedIn أو ارفع السيرة الذاتية.');
            }
        });
        $data = $validator->validate();

        $cvPath = $request->hasFile('cv')
            ? $request->file('cv')->store('cvs/'.now()->format('Y/m'), 'public')
            : null;

        DB::table('entrepreneurship_applications')->insert([
            'full_name' => $data['full_name'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'project_title' => $data['project_title'] ?? null,
            'stage' => $data['stage'] ?? null,
            'idea' => $data['idea'],
            'linkedin' => $data['linkedin'] ?? null,
            'cv_path' => $cvPath,
            'status' => 'new',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['ok' => true], 201);
    }

    public function index(Request $request)
    {
        $query = DB::table('entrepreneurship_applications')->orderByDesc('created_at');
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json(['applications' => $query->paginate(30)]);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->validate(['status' => ['required', 'in:new,contacted,accepted,closed']]);
        DB::table('entrepreneurship_applications')->where('id', $id)->update([
            'status' => $data['status'],
            'updated_at' => now(),
        ]);

        return response()->json(DB::table('entrepreneurship_applications')->find($id));
    }
}
