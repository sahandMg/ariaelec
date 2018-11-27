<?php

namespace App\Console\Commands;

use App\Jobs\UpdateVideo;
use Illuminate\Console\Command;

class updateVideoCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'video:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Video Cache';

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
     * *TODO add this line to crontab -e after starting supervisor service
     *  0 0 * * * php /var/www/html/ariaelec/artisan video:update
     * @return mixed
     */
    public function handle()
    {
        UpdateVideo::dispatch();
    }
}
