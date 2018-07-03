<?php

namespace App\Exceptions;

use Exception;

class TokenException extends Exception
{
    public function report(){

    }
    public function render($request){

        return 'Error';
    }
}
