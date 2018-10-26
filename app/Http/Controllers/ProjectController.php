<?php

namespace App\Http\Controllers;

use App\Project;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Morilog\Jalali\Jalalian;


class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function createProject(Request $request){
//        $validator = Validator::make($request->all(),['name'=>'unique:projects']);
//        if($validator->fails()){
//           return json_decode($validator->errors(),true)['name'];
//        }
        $project = new Project();
        $project->name = $request->name;
        $project->user_id = Auth::id();
        $project->status = 0;
        $project->price = 0;
        $project->save();
        return 'پروژه شما ایجاد شد';
    }
    // Sends back project detail for given token
    public function detail(Request $request){

        $token = $request->token;

       $prjs =  User::where('token',$token)->first()->projects;
        foreach ($prjs as $prj){

            $prj['created_at'] = Jalalian::fromCarbon($prj->created_at) ;
        }
        return $prjs;
    }
    // TODO Add read cart to send user project names
}
