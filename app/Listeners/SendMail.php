<?php

namespace App\Listeners;

use App\Events\UserRegister;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendMail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserRegister  $event
     * @return void
     */
    public function handle(UserRegister $event)
    {
//        $data = [
//
//            'email'=>$event->email
//        ];
//    Mail::send('newUser',$data,function ($message) use($data){
//
//        $message->to = $data->email;
//        $message->from ='Admin@name';
//        $message->subject ='User Email Confirmation';
//    });
    }
}
