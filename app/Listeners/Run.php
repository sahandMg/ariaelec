<?php

namespace App\Listeners;

use App\Events\RunCommand;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Artisan;

class Run
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
     * @param  RunCommand  $event
     * @return void
     */
    public function handle(RunCommand $event)
    {
        Artisan::call('queue:listen');
    }
}
