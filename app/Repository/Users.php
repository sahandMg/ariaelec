<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/23/18
 * Time: 12:57 PM
 */

namespace App\Repository;

use App\User;
class Users
{

    public function find($token){

        return User::where('token',$token)->first();
    }


}