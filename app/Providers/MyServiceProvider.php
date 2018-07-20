<?php

namespace App\Providers;

use App\Repository\ColumnCode;
use Illuminate\Support\ServiceProvider;

class MyServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('ColumnCode',function (){

            return new ColumnCode();
        });
        $this->app->make('ColumnCode');
    }
}
