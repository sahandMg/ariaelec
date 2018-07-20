<?php

namespace App\Http\Controllers;

use App\Cm;
use App\Http\Middleware\TerminateMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->except('login');
    }

    public function login(Request $request)
    {

        try{

            $token = Auth::guard('admin')->attempt(['email'=> $request->email,'password'=>$request->password]);
            if(!$token){

                return '404';
            }
        }
        catch(JWTException $ex){

            return '500';
        }


        $user = Auth::guard('admin')->user();
        $user->update(['token'=>$token]);
        $user['role'] = 'admin' ;
        return ['token'=>$token,'userData'=>$user];
    }

    /**
     * @param Request $request
     * Content manager registration
     * @return int
     */
    public function registerCm(Request $request){

        $cm = new Cm();
        $cm->name = $request->name;
        $cm->email = $request->email;
        $cm->password = Hash::make($request->password);
        $cm->save();
        return 200;

    }

    /**
     * @param Request $request
     * Deletes Content manager account
     * @return array|int
     */
    public function deleteCm(Request $request){


        $cm = DB::table('cms')->where('email',$request->email)->delete();
        if($cm == 0){
            return 410;
        }
        return 200;
    }

    /**
     * @return array|int
     */
    public function controlPanel(){

        $cm = DB::table('cms')->select('name','email')->get();
        if(count($cm) == 0){
            return 410;
        }
//        return TerminateMiddleware::terminate($cm);
        return $cm;
    }
}
