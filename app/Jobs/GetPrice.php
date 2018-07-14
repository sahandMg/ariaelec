<?php

namespace App\Jobs;

use App\Common;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GetPrice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $shopResp;
    protected $keyword;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($keyword)
    {
       $this->keyword = $keyword;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        ------------- Get part price form shop ------------
    $stop = 0;
    Log::info("Searching for $this->keyword price ...");
        $start = Carbon::now();

        $parts = Common::where('manufacturer_part_number','like',"%$this->keyword%")->get()->pluck('manufacturer_part_number');
        Log::info($parts[0]);
        for($i=0;$i<count($parts);$i++) {

            $command = "cd /var/www/html/ariaelec/public/V1 && node index.js $parts[$i]";
            while ($stop == 0) {

                exec($command, $output, $return);
                if (count($output) != 0) {
                    $stop = 1;
                } elseif (Carbon::now()->diffInSeconds($start) > 5) {
                    $this->shopResp = $parts[$i].' --> '.'435';
                    Log::warning('Get price status:' . $this->shopResp);
                }
            }

            if (isset($output) && $output[0] != 'not found') {


                if ($parts == 0) {

                    $this->shopResp = $parts[$i].' --> '.'415';
                    Log::warning('Get price status:' . $this->shopResp);
                }
                Log::warning("Get price status: 200");
            } elseif (isset($output) && $output[0] == 'not found') {

                $this->shopResp = $parts[$i].' --> '.'440';
                Log::warning('Get price status:' . $this->shopResp);
            } else {
                $this->shopResp = $output[0];
                Log::warning("Get price status: $output[0]");
            }
//
//////                ------------------------------------------------
        }
    }
}
