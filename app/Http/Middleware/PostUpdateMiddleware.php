<?php

namespace App\Http\Middleware;

use App\Brief;
use App\Events\PostUpdate;
use Carbon\Carbon;
use Closure;

class PostUpdateMiddleware
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

//        event(new PostUpdate());

        return $next($request);
    }
}
