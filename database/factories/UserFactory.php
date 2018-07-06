<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});



$factory->define(App\Brief::class, function (Faker $faker) {
    return [
        'title' => $faker->name,
        'abstract' => $faker->sentence,
        'category' => $faker->name,
        'product' => $faker->name,
        'image'=>$faker->name,
        'detail_id' => $faker->numberBetween(1,1000)
    ];
});

$factory->define(App\Detail::class, function (Faker $faker) {
    return [

        'text' => $faker->sentence,
        'brief_id' => $faker->numberBetween(1,1000)
    ];
});