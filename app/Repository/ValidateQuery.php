<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 1:39 AM
 */

namespace App\Repository;
use Illuminate\Support\Facades\Validator;
use League\Flysystem\Exception;

class ValidateQuery
{

 static public $validator;
 static public $error = false;

    public static function check($request){

//        /(n-1)*10  10*n

            self::$validator = Validator::make($request->all(), [

                'name' => 'bail|required|unique:users',
                'email' => 'bail|required|email|unique:users',
                'password' => 'bail|required|min:8',

            ]);

        if(self::$validator->fails()){

            self::$error = true;

            if(isset(json_decode(self::$validator->errors(),true)['email'])){


                return json_decode(self::$validator->errors(),true);

            }elseif(isset(json_decode(self::$validator->errors(),true)['name'])){

                return json_decode(self::$validator->errors(),true);

            }elseif(isset(json_decode(self::$validator->errors(),true)['password'])){

                return json_decode(self::$validator->errors(),true);

            }
//elseif (isset(json_decode(self::$validator->errors(),true)['repeat'])){
//
//                return 'repeat';
//            }

        }else{

            return self::$error;
        }

    }



}