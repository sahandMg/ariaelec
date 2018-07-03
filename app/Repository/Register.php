<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 9:43 AM
 */

namespace App\Repository;
use App\Events\UserRegister;
use App\Providers\EventServiceProvider;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;
use App\Repository\ValidateQuery;
class Register
{


    public static function register($request,$role){

        if(ValidateQuery::check($request)){

            return ValidateQuery::check($request);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        switch ($role){
            case 'admin':
                $user->role = 'admin';
                break;
            case 'cm':
                $user->role = 'cm';
                break;
        }
//        $user->reset_password = str_shuffle("ajleyqwncx3497");
//        $user->avatar = 'Blank100*100.png';
        $user->save();
        return $user;
    }
}