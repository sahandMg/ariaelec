<?php

namespace App\Jobs;

use App\Brief;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

class TimeUpdate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Brief::chunk(100,function ($briefs){

            foreach ($briefs as $brief){

                $brief->update(['days'=>Carbon::now()->diffInDays($brief->created_at)]);
            }

        });

        Log::info('Contents are up to date:  '.Carbon::now());
    }
}
