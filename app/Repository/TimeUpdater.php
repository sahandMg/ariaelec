<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/29/18
 * Time: 3:37 PM
 */

namespace App\Repository;


use Carbon\Carbon;
use App\Brief;

class TimeUpdater
{

    public static function updateTime(){

        Brief::chunk(100,function ($briefs){

            foreach ($briefs as $brief){

                $brief->update(['days'=>Carbon::now()->diffInDays($brief->created_at)]);
            }

        });
    }
}