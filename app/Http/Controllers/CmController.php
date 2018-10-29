<?php

namespace App\Http\Controllers;

use App\Brief;
use App\Detail;
use App\Image;
use App\Repository\CmGoogleRegister;
use App\Repository\TimeUpdater;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class CmController extends Controller
{

    public function __construct()
    {
        $this->middleware('cm')->except('login','getContent');
    }

    public function login(Request $request)
    {

        try{

            $token = Auth::guard('cManager')->attempt(['email'=> $request->email,'password'=>$request->password]);
            if(!$token){

                return '404';
            }

        }
        catch(JWTException $ex){

            return '500';
        }
        $user = Auth::guard('cManager')->user();
        $user->update(['token'=>$token]);
        $user['role'] = 'cm' ;
        return ['token'=>$token,'userData'=>$user];

    }
    /*
     * Google Login Methods
     */

    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        return  CmGoogleRegister::googleRegister();
    }

    public function addContent(Request $request){

        $user = $_POST['user'];
        $detail = new Detail();
        $brief = new Brief();
        $brief->title = $request->title;
        $brief->abstract = $request->abstract;
        $brief->category = $request->category;
        $brief->image = $request->image;
        $brief->product = serialize($request->product);
        $brief->user_id = Auth::guard('cManager')->id();
        $brief->save();
        /**
         * Create a job as TimeUpdater for updating post date time
         * A cron job will trigger the dispatch job method
         */
        TimeUpdater::updateTime();
//        if($request->input('image')){
//            $img = new Image();
//            $img->image = $request->image;
//            $img->type = 'brief';
//            $img->save();
//        }
        $detail->text = serialize($request->text);
        $detail->brief_id = Brief::orderBy('created_at','decs')->first()->id;
        $detail->save();
        $briefs = Brief::where('user_id',$user->id)->get();
//        return TerminateMiddleware::terminate($briefs);
        return $briefs;
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

        return redirect('http://localhost:80/ContentManagerPanel/images');
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
//        return TerminateMiddleware::terminate(200);
        return 200;
    }

    /**
     * @param Request $request
     * @return array
     *
     * Returns Brief + Detail
     */

      public function getContent(Request $request){

          $brief = Brief::where('id',$request->id)->first();
          $text = unserialize($brief->detail->text);
          $product = unserialize($brief->product);
//          TimeUpdater::updateTime();
          return [$brief,$text,$product];


    }

    /**
     * TODO add method for cm to add && edit parts
     */


}
