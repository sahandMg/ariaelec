<?php

namespace App\Http\Middleware;

use Closure;

class RouteRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if(explode('/',$request->path())[0] == 'api' || $request->url() == 'http://localhost/login/google' || $request->url() == 'http://localhost/api/user/login/google/callback'){

            return $next($request);
        }else{

            return response()->view('welcome');
        }
    }
}
