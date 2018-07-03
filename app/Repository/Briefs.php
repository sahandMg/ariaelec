<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/22/18
 * Time: 11:41 PM
 */

namespace App\Repository;

use App\Brief;

class Briefs
{

    public function getBiref($id){

        return Brief::where('user_id',$id)->get();

    }

    public function all(){

        return Brief::all();
    }

}