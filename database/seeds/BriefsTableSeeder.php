<?php

use Illuminate\Database\Seeder;

class BriefsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Brief::class,100000)->create();
    }
}
