<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Repository\ColumnCode;
use Carbon\Carbon;
use DeepCopy\f001\A;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Component;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Schema;

class TableController extends Controller
{
    /**
     * @var mixed
     */


    /**
     *  get all tables columns and store them in an array
     *  then map a code to each column name which will be used as query string in url
     *  Save The Array In Cache
     * @param ColumnCode $code
     */
    private $code;
    public function __construct(ColumnCode $code)
    {
            return $this->code = $code->all();
    }

    private $columns = [];
    private $merged = [];

    public function ColumnName(){
//
        $models = Component::where('product_id',38)->get()->pluck('slug');
    /*
     *  Collect Model Names
     */
        for($i=0;$i<count($models);$i++){
            $models[$i] = str_replace('-','_',$models[$i]);
            $models[$i] = str_replace('+','',$models[$i]);
            $models[$i] = str_replace('__','_',$models[$i]);
            $models[$i] = 'App\IC\\'.$models[$i];
        }
        /*
         * get Table names from model names
         */

        for($i=0;$i<count($models);$i++){


            $instance = new $models[$i];
            $tables[$i] = $instance->getTable();
        }
        array_push($tables,'commons');

        /*
        * get Table columns from tables
        */

        for($i=0;$i<count($tables);$i++){

            $this->columns[$i] = Schema::getColumnListing($tables[$i]);
        }

        /*
        * removing unused columns
        */

        for($i=0;$i<count($tables);$i++){

            $this->columns[$i] = Schema::getColumnListing($tables[$i]);

            array_shift($this->columns[$i]);
            array_pop($this->columns[$i]);
            array_pop($this->columns[$i]);
            array_pop($this->columns[$i]);
            array_pop($this->columns[$i]);
        }
            /*
            * Caching the column array
            */

       Cache::put('columns',$this->columns,100);


    }

         /*
        * Getting array from cache
        * merging all data
        */

    public function merging(){

       $this->columns = Cache::get('columns');

        for($i=0;$i<count($this->columns);$i++){

            $this->merger($this->columns[$i]);

        }

        $this->merged = array_unique($this->merged);
        $this->merged = array_values($this->merged);
        Cache::put('merged',$this->merged,100);

    }
    private function merger($arr1){

        $this->merged = array_merge($arr1,$this->merged);
    }

/*
 *  creating an associative array form the new merged array
 */

    public function mapping(){


        if(count(DB::table('column_names')->get())>0){

             return ($this->code);
        }
        $this->merged = Cache::get('merged');

        for($i=0;$i<count($this->merged);$i++){

            $names[$i] = str_random(3);

        }
        $this->merged = array_combine($names,$this->merged);
        DB::table('column_names')->insert([
            'column_name'=>serialize($this->merged),
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now(),
        ]);


        /** Cache not working :(
         * Redis is needed ...
         * Learn Redis to continue ...
         **/

        return 'done';

    }

    /*
     *  adding parts data to database instructions :
     * 1) separate data
     * 1.0) products and components tables are ready to use. no changes needed.
     * 1.1) specify the product name from products table and keep it's id. example : IC --> id = 38
     * 1.2) find the related product components using product_id in components table and get slug column date.
     * example : product_id = 38 --> slug = ClockTiming-Clock-Generators-PLLs-Frequency-Synthesizers
     * 1.3) use makeTable method to create models + tables
     * 1.4) create models + tables in related folders
     * 1.5) copy related codes to migrations classes
     * 1.6) fill helpers table with digikey class in the Shops folder
     * 1.7) migrate the crated tables
     * 1.8) change the files name in the comp folder with .csv2 to the names created for the  models
     * 1.8) use addSeparate method to fill separate tables
     * 1.7) use addCommon method to fill commons table
     */

    public function makeTable(){

        $arr = Component::where('product_id',38)->get()->pluck('slug');

        for($i=0;$i<count($arr);$i++){
            $arr[$i] = str_replace('-','_',$arr[$i]);
            $arr[$i] = str_replace('+','',$arr[$i]);
            $arr[$i] = str_replace('__','_',$arr[$i]);
            Artisan::call("make:model",['name'=>' IC/'.$arr[$i],'-m'=>'--migration']);
        }

        return $arr;
    }

    public function addSeparate(){
/*
 * change product_id
 */
        $modelNames = DB::table('components')->where('product_id',38)->get()->pluck('slug');
        $i = 0;
        $counter = 1;
        $corrupt = [];
        foreach ($modelNames as $modelName){

            $className[$i] = str_replace('-','_',$modelName);
            $className[$i] = str_replace('+','',$className[$i]);
            $className[$i] = str_replace('__','_',$className[$i]);

            $i++;
        }


        for($t=0;$t<count($className);$t++){
            $csv = [];
            $class =  'App\IC\\'.$className[$t];
            $model = new $class();
            $commonTableCols = Schema::getColumnListing($model->getTable());
            array_shift($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            if(file_exists(public_path('/comps/'.$className[$t].'2.csv'))) {

                $lines = file(public_path('/comps/'.$className[$t] . '2.csv'));
                foreach ($lines as $key => $value) {
                    $csv[$key] = str_getcsv($value);
                }

                for ($i = 0; $i < count($csv); $i++) {

                    $common = new $class();

                    for ($j = 0; $j < count($csv[$i]); $j++) {

                        $common[$commonTableCols[$j]] = $csv[$i][$j];

                    }
                    $common->common_id = $counter++;
                    $common->save();
                }
            }else{
                $corrupt[$t] = $className[$t];
            }
        }

//    dd($startMemory,memory_get_usage() - $startMemory.' bytes');
        dd($corrupt);


    }

    public function addCommon(){
        /*
    * product_id = 38 ==> Integrated Circuits
    */

        $modelNames = Component::where('product_id',38)->get()->pluck('slug');
        $i = 0;
        $counter = 723;
        $corrupt = [];
        foreach ($modelNames as $modelName){
            $className[$i] = str_replace('-','_',$modelName);
            $className[$i] = str_replace('+','',$className[$i]);
            $className[$i] = str_replace('__','_',$className[$i]);
            $i++;
        }


        for($t=0;$t<count($className);$t++){
            $csv = [];
            $common = [];
            $class =  'App\IC\\'.$className[$t];
            $model = new $class();
            $commonTableCols = Schema::getColumnListing('commons');
            array_shift($commonTableCols);
            array_shift($commonTableCols);
            array_shift($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            array_pop($commonTableCols);
            if(file_exists(public_path('/comps/'.$className[$t].'.csv'))) {

                $lines = file(public_path('/comps/'.$className[$t] . '.csv'));
                foreach ($lines as $key => $value) {
                    $csv[$key] = str_getcsv($value);
                }

                $component_id[$t] = DB::table('components')->where('slug',str_replace('_','-',$className[$t]))->first()->id;

                for ($i = 0; $i < count($csv); $i++) {

                    $common = new \App\Common();

                    for ($j = 0; $j < count($csv[$i]); $j++) {

                        $common[$commonTableCols[$j]] = $csv[$i][$j];

                    }
                    $common->component_id = $component_id[$t];
                    $common->model = str_replace('_',' ',$className[$t]);

                    $common->save();
                }
                $counter++;
            }else{
                $corrupt[$t] = $className[$t];
            }
        }

        dd($corrupt);

    }

}
