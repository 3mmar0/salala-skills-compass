<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        $user = User::query()->where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'بيانات الدخول غير صحيحة.'], 422);
        }

        $plainToken = Str::random(80);
        AdminToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(14),
        ]);

        return response()->json(['token' => $plainToken, 'user' => ['name' => $user->name, 'email' => $user->email]]);
    }

    public function logout(Request $request)
    {
        $record = $request->attributes->get('admin_token');
        $record?->delete();

        return response()->noContent();
    }
}
