<?php

namespace App\Http\Middleware;

use Closure;

class Exception
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



        try{
            $request;
        }catch (\Exception $exception){

            dd($exception);
        }
        return $next($request);
    }
}
