<?php

namespace App\Http\Controllers;

use App\Common;
use App\myModel;
use App\Product;
use App\RelationshipsTrait;
use App\Repository\Slugger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use League\Flysystem\Exception;
use Prophecy\Exception\Doubler\MethodNotFoundException;

class ProductController extends Controller
{

use RelationshipsTrait;

    public function addSlug()
    {

        return Slugger::setSlug(new Product());


    }

    public function all(){

        return Product::with('components')->get();
    }

    public function edit(Request $request){

        $partNumber = $request->pn;
        $cols = Schema::getColumnListing('commons');
        try{
            $part = DB::table('commons')->where('part_number',$partNumber)->firstOrFail();
        }catch (ModelNotFoundException $e){

            return '410';
        }

        for($i=0;$i<count($cols);$i++){
            if($request->has($cols[$i])){

                $part->update([ $cols[$i] => $request->input($cols[$i])]);
            }
        }

        return '200';

    }

    public function getPartList(Request $request){


        //  ?????????????????

        $start = Carbon::now();
        $model = $request->model;
        $num = $request->num;
        $rel = new Common();
//        $keys = array_keys($rel->relationships());
//        $similar = [];
//        for($i=0;$i<count($keys);$i++){
//            similar_text($keys[$i], $model, $percent);
//            if($percent > 70){
//                array_push($similar,$keys[$i]);
//            }
//        }


      $parts = DB::table('commons')->where('model','Data Acquisition Analog to Digital Converters ADC')->get();
        $end = Carbon::now();
        $id = $parts->first()->id;

        $parts = $parts->where('id','<',$id + 20*($num))
            ->where('id','>=',$id + 20*($num-1))
            ->all();

        if(count($parts) == 0){

            return 415;
        }else{



            return $parts;
        }


    }

    public function getPart(Request $request){

//        ??????? slug + paginate(20) common + separate

        //        commons --> قطعات مربوط به یک کامپوننته که ۲۰ تا ۲۰ تا برمیگرده
        $paginate = $request->num;
        $component = DB::table('components')->where('slug',$request->slug)->first();
        if($component == null){
            return 410;
        }
        $className = 'App\IC\\'.str_replace('-','_',$request->slug);
        $class = new $className();
        $commons = DB::table('commons')
            ->join($class->getTable(),'commons.id','=',$class->getTable().'.'.'common_id')->get();

//        $commons = Common::where('component_id',$component->id)->with($keys)->get();
        $id = $commons->first()->common_id;

        $commons = $commons->where('id','<',$id + 20*($paginate))->where('id','>=',$id + 20*($paginate-1))->all();
        $commons = array_values($commons);

        if($commons != null) {

// ساخت کلید های فیلتر

            $separates = $class->whereBetween('common_id',[$id + 20*($paginate-1),$id + 20*($paginate)])->get();
            $commonTableCols = Schema::getColumnListing('commons');

            $sepTableCols = Schema::getColumnListing($class->getTable());

            array_shift($sepTableCols);
            array_pop($sepTableCols);
            array_pop($sepTableCols);
            array_pop($sepTableCols);
            array_pop($sepTableCols);
           array_shift($commonTableCols);
           array_shift($commonTableCols);
           array_shift($commonTableCols);
           array_shift($commonTableCols);
           array_shift($commonTableCols);
           array_pop($commonTableCols);
           array_pop($commonTableCols);
           array_pop($commonTableCols);
           array_pop($commonTableCols);
           array_pop($commonTableCols);

           for ($t = 0; $t < count($commonTableCols); $t++) {
               for ($i = 0; $i < count($commons); $i++) {
                   $colName = $commonTableCols[$t];
                   $cols[$commonTableCols[$t]][$i] = $commons[$i]->$colName;
                       $cols[$commonTableCols[$t]] = array_unique($cols[$commonTableCols[$t]]);
                       $cols[$commonTableCols[$t]] = array_values($cols[$commonTableCols[$t]]);
               }
           }

            for ($t = 0; $t < count($sepTableCols); $t++) {
                for ($i = 0; $i < count($separates); $i++) {
                    $colName = $sepTableCols[$t];
                    $sepCols[$sepTableCols[$t]][$i] = $separates[$i]->$colName;
                        $sepCols[$sepTableCols[$t]] = array_unique($sepCols[$sepTableCols[$t]]);
                        $sepCols[$sepTableCols[$t]] = array_values($sepCols[$sepTableCols[$t]]);

                }
            }


            if(!isset($cols) || !isset($sepCols)){
                return '420';
            }else{

                $result = array_merge($cols,$sepCols,$commons);
                return $result;
            }


       }else{
            return '415';
        }


    }


}
