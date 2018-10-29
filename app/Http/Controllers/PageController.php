<?php

namespace App\Http\Controllers;

use App\Brief;
use GuzzleHttp\Client as GuzzleClient;
use App\Image;
use App\Repository\Cropper;
use App\User;
use App\Variable;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Psr\Http\Message\ResponseInterface;

class PageController extends Controller
{
    public $info = 10;

    public function home($category=null,Request $request){

      $dataId = Brief::orderBy('id','desc')->first()->id;
      $contents = Brief::orderBy('id','desc')->get()->take($this->info);
        if($category){
            $contents = Brief::orderBy('id','desc')->where('category',$category)->get()->take($this->info);
        }
        // else{
        //     if($dataId - $this->info < 0){
        //         $contents = Brief::where('id','<=',$dataId)->get();
        //     }else{

        //         $contents = Brief::where([['id','<',$dataId],['id','>',$dataId - $this->info]])->get();
        //     }
        // }


        return $contents;
    }

    public function moreContent($category=null,Request $request){
        $num = $request->num;
        $dataId = Brief::orderBy('id','desc')->first()->id;
        $contents = Brief::orderBy('id','desc')->skip($num*10)->take($this->info)->get();
        if($category){
            $contents = Brief::orderBy('id','desc')->where('category',$category)
            ->skip($num*10)->take($this->info)->get();
        }
        // $contents = Brief::where([['id','<=',($dataId - $this->info -($num -1)*10)],['id','>',$dataId - $this->info - $num*10]] )->get();
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

    public function Videos(){
        $client = new GuzzleClient();
        $url = 'https://www.aparat.com/etc/api/videoByUser/username/sahandmg/';
        $headers = ['Content-Type' => 'application/json'];
        // $promise1 = $client->requestAsync('GET',$url,$headers)->then(function (ResponseInterface $response) {
        //     $this->resp = $response->getBody()->getContents();
        //     return $this->resp;
        // });

        // $promise1->wait();

        $curl = curl_init();
        curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $url
));
        $result = curl_exec($curl);
        curl_close($curl);
        return json_decode($result,true)['videobyuser'];

    }


}
