<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/29/18
 * Time: 3:37 PM
 */

namespace App\Repository;


use App\Jobs\TimeUpdate;
use Carbon\Carbon;
use App\Brief;

class TimeUpdater
{

    public static function updateTime(){

        TimeUpdate::dispatch()->onQueue('ContentTime');
    }
}