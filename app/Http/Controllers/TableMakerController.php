<?php

namespace App\Http\Controllers;

use App\Category;
use App\Comment;
use App\Common;
use App\Component;
use App\Helper;
use App\Imports\CommonsImport;
use App\Product;
use App\SubCategory;
use App\Underlay;
use Illuminate\Http\Request;
use App\Shops\Digikey;
use App\imports\ComponentsImport;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Facades\Excel;

class TableMakerController extends Controller
{

    public $add = 0;
 	public function getLinks(){


 		$digikey = new Digikey();
 		return $digikey->getLinks();

/*
 * Use this to reorder helpers table id
 */
//        $helpers = Helper::all();
//        foreach ($helpers as $key => $helper){
//            $helper->update(['id'=>$key+1]);
//        }
 	}
 	/*
	Import category.csv
	collect category names
	store them in components table
 	*/

 	public function import_Categories(){

 			Excel::import(new ComponentsImport,'/imports/categories.csv');
        return 200;

 	}
/*
 *  make table migration
 */
 	public function migration_maker(){

        $components = Component::orderBy('name','asc')->get()->pluck('name');

        for($i=7;$i<20;$i++){

            Artisan::call("make:model",['name'=>' IC/'.$components[$i],'-m'=>'--migration']);

        }
        return 200;

    }

    /*
     *  fills subcategories table
     *  EX: integrated_circuits->PMIC->A221xg  --> PMIC is subcategory
     */
    public function subcategory(){

//        Excel::import(new ComponentsImport,'/imports/categories.csv');
//        $cats = array_values(array_unique(Cache::get('subcategory')));
//        for($i=0;$i<count($cats);$i++){
//            $sub = new SubCategory();
//            $sub->name = $cats[$i];
//            $sub->save();
//        }


//      ---------------------===-------------------------------______-_----_-_--_-__-_--_______--__

    /*
     *  RUN THIS CODE TO REMOVE '_' CHARACTER FROM THE BEGINNING OF THE SUBCATEGORIES
     */


//        $components = SubCategory::all();
//        foreach ($components as $component){
//            if(substr($component->name,0,1) == '_'){
//                $characters = explode('_',$component->name);
//                unset($characters[0]);
//                $characters = implode("_",$characters);
//                $component->update(['name' => $characters]);
//            }
//            print_r('<pre>'.$component->name.'</pre>');
//        }
//
//        return 200;

    }

/*
 *  Fills categories table
 *  EX : Integrated Circuits (ICs) -> PMIC -> Motor Drivers_ Controllers ==> IC is a category == product
 *  Sooti dadam
 */
    public function category(){

        Excel::import(new ComponentsImport,'/imports/categories.csv');
        $cats = array_values(array_unique(Cache::get('category')));
        for($i=0;$i<count($cats);$i++){
            $sub = new Category();
            $sub->name = $cats[$i];
            $sub->save();
        }
    }

    public function underlay(){

//        Excel::import(new ComponentsImport,'/imports/categories.csv');
//        $cats = array_values(array_unique(Cache::get('underlay')));
//        for($i=0;$i<count($cats);$i++){
//            $sub = new Underlay();
//            $sub->name = $cats[$i];
//            $sub->save();
//        }

//        -------------------------------'--------------------------'-'--'-'--'-'-'-'-'---'-'------------
        /*
         *  RUN THIS CODE TO REMOVE '_' CHARACTER FROM THE BEGINNING OF THE SUBCATEGORIES
         */
//        -------------------------------'--------------------------'-'--'-'--'-'-'-'-'---'-'------------

//        $components = Underlay::all();
//        foreach ($components as $component){
//            if(substr($component->name,0,1) == '_'){
//                $characters = explode('_',$component->name);
//                unset($characters[0]);
//                $characters = implode("_",$characters);
//                $component->update(['name' => $characters]);
//            }
//            print_r('<pre>'.$component->name.'</pre>');
//        }

        return 200;

    }

    public function products(){

        Excel::import(new ComponentsImport,'/imports/categories.csv');
        $cats = array_values(array_unique(Cache::get('product')));

        for($i=0;$i<count($cats);$i++){
            $sub = new Product();
            $sub->product_name = $cats[$i];
            $sub->slug = $cats[$i];
            $sub->save();
        }
        return 200;
    }
    /*
     * Fills migrated table with column names
     * needs to change the migration class method dynamically
     */
    public function FillTable(){

        $helpers = Helper::all();

        foreach ($helpers as $key=>$helper){

            $helper->update(['id'=>$key+1]);
        }
    }

/*
 *  Fills commons table import csv file directly to phpmyadmin
 */
    public function commons(){


        $commons = DB::table('commons')->get();
        $arr = DB::table('commons')->get()->pluck('manufacturer_part_number')->toArray();
        $values = array_count_values($arr);
        foreach ($commons as $key => $common){

            if(array_search($common->manufacturer_part_number,$arr) != $key){

                DB::table('commons')->where('manufacturer_part_number',$common->manufacturer_part_number)->delete();
            }

//            DB::table('commons')->where('manufacturer_part_number',$common->manufacturer_part_number)->update(['id'=>$key+1]);

        }
        return 200;

    }

    public function separate(){
        ini_set('memory_limit', '512M');
//        print_r(phpinfo());

        $models = DB::table('components')->get()->pluck('name');

            $path = "/imports/CSVResult";
            /*
             * Use this code to rename csv files (removing '_' from endpoints)
             */
//            $path = public_path("/imports/CSVResult");
//            $names = array_diff(scandir($path), array('.', '..'));
//            array_shift($names);
//            for($i=0 ; $i<count($names); $i++){
//                if(str_split($names[$i])[strlen($names[$i])-5] == '_'){
//
//                    rename($path.'/'.$names[$i],$path.'/'.mb_substr($names[$i],0,-5).'.csv');
//                    $names[$i] = mb_substr($names[$i],0,-5);
//                }
//            }

//            ---------------------------------------------------------------------------------

            for($i= 58 ;$i< 59; $i++){
//                try{
//                    $file = fopen($path."/$models[$i].csv",'r');
//                }catch (\Exception $exception){
//                    continue;
//                }

//                while(fgetcsv($file,1000,',') !== false){
//
//                    for($t=0;$t<count($cNames);$t++){
//
//
//                    }
//
//                    print_r(fgetcsv($file,1000,','));
//
//
//                }

                Excel::import(new CommonsImport($models[$i]),$path."/Discrete_Semiconductor_$models[$i].csv");
//                fclose($file);
            }

            return 200;




    }

    public function component(){
        Component::where('id','>',72)->where('id','<',168)->chunk(20,function ($vars){

                foreach ($vars as $var){
                    $var->update(['product_id'=>15]);
                }
        });
    }

    public function modifyId(){
        ini_set('memory_limit', '1024M');
            $components = DB::table('components')->get()->pluck('name');
            foreach ($components as $key => $component) {
                   $myModel = 'App\IC\\'.$component;
                    $instance = new $myModel();
                    try {
                        $tableName = $instance->getTable();

                        session()->put('table', $tableName);
                        if (count(DB::table($tableName)->get()) > 0) {
                            $tableName = session('table');

                            DB::table($tableName)->orderBy('id')->chunkById(1600, function ($queries) {
                                foreach ($queries as $key => $query) {
                                    $tableName = session('table');
                                    DB::table($tableName)->where('id', $query->id)->update(['id' => $key + 1]);
                                }
                            });
                            echo $tableName;
                        }
                    }catch (\Exception $exception){

                    }

            }

    }

    public function modifyCommonId(){
        ini_set('memory_limit', '1024M');

                $num = 100;


                    DB::table('commons')->orderBy('id')->chunkById($num, function ($queries) use($num) {
                        foreach ($queries as $key => $query) {

                            DB::table('commons')->where('id', $query->id)->update(['id' => $this->add + $key + 1]);
                            if(fmod($key,100) == 99 ){
                                $this->add = $this->add + 100;
                            }
                        }
                    });

                }



}
