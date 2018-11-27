<?php

namespace App\Console\Commands;

use App\Jobs\TimeUpdate;
use Illuminate\Console\Command;

class ContentUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updating content time';

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
     *TODO add this line to crontab -e after starting supervisor service
     *  0 0 * * * php /var/www/html/ariaelec/artisan content:update
     * @return mixed
     */
    public function handle()
    {
        TimeUpdate::dispatch();
    }
}
