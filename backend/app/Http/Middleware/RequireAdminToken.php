<?php

namespace App\Http\Middleware;

use App\Models\AdminToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $record = AdminToken::query()
            ->where('token_hash', hash('sha256', $token))
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $record->forceFill(['last_used_at' => now()])->save();
        $request->attributes->set('admin_token', $record);

        return $next($request);
    }
}
