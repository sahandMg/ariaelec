<?php

namespace App\Http\Middleware;

use Closure;
use App\Http\Middleware\UserMiddleware;
class TerminateMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
// use this middleware for sending back authenticated user's data
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    public static function terminate($response=null){

        return ['response'=>$response,'userData'=>session('userToken')];
    }
}
