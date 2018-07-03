<?php

namespace App\Http\Controllers;

use App\Brief;
use App\Cm;
use App\Content;
use App\Detail;
use App\Http\Middleware\TerminateMiddleware;
use App\Image;
use App\Repository\Briefs;
use App\Repository\Cropper;
use App\Repository\Login;
use App\Repository\TimeUpdater;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tymon\JWTAuth\Facades\JWTAuth;

class CmController extends Controller
{
    public function registerCm(Request $request){

    $cm = new User();
        $cm->name = $request->name;
        $cm->email = $request->email;
        $cm->password = bcrypt($request->password);
        $cm->role = 'cm';
        $cm->save();
        return JWTAuth::getToken();

    }
    public function deleteCm(Request $request){


        $cm = DB::table('users')->where('name',$request->name)->delete();
        if($cm == 0){
            return 410;
        }
        return TerminateMiddleware::terminate(200);
    }

    public function addContent(Request $request){

        $user = $_POST['user'];
        $detail = new Detail();
        $brief = new Brief();
        $brief->title = $request->title;
        $brief->abstract = $request->abstract;
        $brief->category = $request->category;
        $brief->product = serialize($request->product);
        $brief->user_id = $user->id;
        $brief->save();
        TimeUpdater::updateTime();
        if($request->input('image')){
            $img = new Image();
            $img->image = $request->image;
            $img->type = 'brief';
            $img->save();
        }
        $detail->text = serialize($request->text);
        $detail->brief_id = Brief::orderBy('created_at','decs')->first()->id;
        $detail->save();
        $briefs = Brief::where('user_id',$user->id)->get();
        return TerminateMiddleware::terminate($briefs);
    }

    public function addImage(Request $request){

        $user = $_POST['user'];
        if($request->file('imageFile') != null){
            $img = new Image();
            $img->image = $request->file('imageFile')->move('files/images',time().'.'.$request->file('imageFile')->getClientOriginalExtension());
            $img->user_id = $user->id;
//            $img->brief_id = ;
            $img->save();
            // Cropper::crop($request,$img,$size ='100x100');
        }

        return redirect('http://localhost:3000/ContentManagerPanel/images');
    }

    public function getImages(){
        $user = $_POST['user'];
        return Image::where('user_id',$user->id)->get()->pluck('image');
    }

    public function editContent(Request $request){

        $detail = Detail::where('id',$request->id)->first();
        $brief = Brief::where('id',$request->id)->first();
        if($request->input('text')){
            $detail->update(['text'=>serialize($request->text)]);
        }elseif ($request->input('title')){
            $brief->update(['title'=>$request->title]);
        }elseif ($request->input('abstract')){
            $brief->update(['abstract'=>$request->abstract]);
        }elseif ($request->input('image')){
            $brief->update(['image'=>$request->image]);
        }elseif ($request->input('category')){
            $brief->update(['category'=>$request->category]);
        }elseif($request->input('product')){
            $brief->update(['product'=>serialize($request->product)]);
        }
        return TerminateMiddleware::terminate(200);
    }

      public function getContent(Request $request){

          $brief = Brief::where('id',$request->id)->first();
          $text = unserialize($brief->detail->text);
          $product = unserialize($brief->product);
          TimeUpdater::updateTime();
          return [$brief,$text,$product];


    }


}
