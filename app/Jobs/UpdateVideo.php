<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class UpdateVideo implements ShouldQueue
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
        if(Cache::has('AparatRes')){

            Cache::forget('AparatRes');
            $url = 'https://www.aparat.com/etc/api/videoByUser/username/sahandmg/perpage/1000';
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => $url
            ));
            $result = curl_exec($curl);
            curl_close($curl);
            Log::warning('video job running');
            $results = json_decode($result,true)['videobyuser'];
//            TODO Clear this cache every 24 hours
            Cache::put('AparatRes',$results,1440);

        }

    }
}
