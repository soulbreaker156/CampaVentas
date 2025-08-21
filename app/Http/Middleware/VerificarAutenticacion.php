<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class VerificarAutenticacion
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('sin.acceso');
        }

        return $next($request);
    }
}
