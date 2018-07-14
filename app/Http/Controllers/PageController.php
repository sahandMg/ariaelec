<?php

namespace App\Http\Controllers;

use App\Brief;
use App\Http\Middleware\TerminateMiddleware;
use App\Image;
use App\Repository\Cropper;
use App\User;
use App\Variable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\DocBlock\Tags\Var_;
use Tymon\JWTAuth\Facades\JWTAuth;

class PageController extends Controller
{
    public $info = 10;

    public function home($category=null,Request $request){

        $data = Brief::latest()->first()->id;
        if($category){
            $contents = Brief::where('category',$category)->where([['id','<',$data],['id','>',$data - $this->info]])->get();
        }else{
            $contents = Brief::where([['id','<',$data],['id','>',$data - $this->info]])->get();
        }


        return $contents;
    }

    public function moreContent(Request $request){
        $num = $request->num;
        $data = Brief::latest()->first()->id;
        $contents = Brief::where([['id','<=',($data - $this->info -($num -1)*10)],['id','>',$data - $this->info - $num*10]] )->get();
        return $contents;
    }



    public function viewer(){

        $users = User::whereNotNull('token')->get();

        foreach ($users as $user){

            if(JWTAuth::parseToken($user->token)->check() === false){
                $user->update(['token'=>null]);
            }
        }
        $tokens = User::where('token','!=',null)->get();

        return 'Online Users : '.count($tokens);
    }
// ---------------- For test ------------------
    public function crop(){

        return view('test');
    }

    public function post_crop(Request $request){
        if($request->file('image') != null){
            $time = time();
            $img = new Image();
            $img->image = $time.'.'.$request->file('image')->getClientOriginalExtension();
            $request->file('image')->move('files/images',$img->image);
            $img->type = 'brief';
            $img->save();
            Cropper::crop($request,$img,$size='100x100',$time);

            return redirect('crop');
        }
    }


}
