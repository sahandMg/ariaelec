<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
    /**
     * TODO Change redirect path after setting up the domain
     */
    'google' => [
        'client_id' => '429882482742-6gehr73k55jqa06vjeg09k4ugl0bvbtu.apps.googleusercontent.com',         // Your GitHub Client ID
        'client_secret' =>'1ELk2Lk1tomb7yoa4yUbb8D5', // Your GitHub Client Secret
        'redirect' => 'http://localhost/api/user/login/google/callback',
        ]



];
