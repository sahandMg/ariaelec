<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function createProject(Request $request){
        $validator = Validator::make($request->all(),['name'=>'unique:projects']);
        if($validator->fails()){
           return json_decode($validator->errors(),true)['name'];
        }
        $project = new Project();
        $project->name = $request->name;
        $project->user_id = Auth::id();
        $project->save();
        return 200;
    }
}
