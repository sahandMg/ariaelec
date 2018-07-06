<?php

namespace App\Http\Middleware;

use Closure;

use Tymon\JWTAuth\Facades\JWTAuth;

class AdminMiddleware
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
        try {
            JWTAuth::parseToken()->user();
        } catch (\Exception $exception) {

//          throw new TokenException($exception);
            return 300;
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        $userData = JWTAuth::parseToken()->authenticate();
        $_POST['user'] = JWTAuth::parseToken()->toUser();

        if ($userData->role == 'admin') {

            session(['userToken' => $userData]);
            return $next($request);
        }else{
            return response('320');
        }

}
}
