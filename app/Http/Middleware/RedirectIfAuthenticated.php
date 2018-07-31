<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;


class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        try{
            JWTAuth::parseToken()->checkOrFail();
        }catch (TokenBlacklistedException $exception){

            return response('300');
        }catch (TokenExpiredException $exception){
            return response('300');
        }
        try {
            $userData = User::where('token',$request->token)->firstOrFail();
        } catch (\Exception $exception) {

//          throw new TokenException($exception);
            return response('320');
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());
        Auth::guard('user')->login($userData);
        $_POST['user'] = $userData;

//        if (Auth::guard('user')->check()) {

            session(['userToken' => $userData]);

            return $next($request);
//        }else{

//            return response('320');
//        }


    }
}
