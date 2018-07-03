<?php

namespace App\Listeners;

use App\Events\PostUpdate;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Brief;
class BriefUpdate
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PostUpdate  $event
     * @return void
     */
    public function handle(PostUpdate $event)
    {


         Brief::chunk(100,function ($briefs){

            foreach ($briefs as $brief){
                $brief->update(['days'=>Carbon::now()->diffInDays($brief->created_at)]);
            }
        });
    }
}
