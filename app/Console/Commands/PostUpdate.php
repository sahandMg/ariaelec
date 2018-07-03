<?php

namespace App\Console\Commands;

use App\Brief;
use Carbon\Carbon;
use Illuminate\Console\Command;

class PostUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'post:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update contents time';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
//        Brief::chunk(100,function ($briefs){
//
//            foreach ($briefs as $brief){
//                $brief->update(['days'=>Carbon::now()->diffInHours($brief->created_at)]);
//            }
//        });
        \Log::info('time is'.' '.Carbon::now());
    }
}
