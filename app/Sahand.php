<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/23/18
 * Time: 11:35 AM
 */

namespace App;

use App\User;

class Sahand
{

    public $name ;

    public function __construct(User $name){

        $this->name = $name;

    }

    public static function find($id){

        return User::find($id);
    }
}