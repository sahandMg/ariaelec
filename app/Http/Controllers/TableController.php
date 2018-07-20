<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Repository\ColumnCode;
use Carbon\Carbon;
use DeepCopy\f001\A;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Component;
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
     * TODO get all tables columns and store them in an array
     * TODO then map a code to each column name which will be used as query string in url
     * TODO Save The Array In Cache
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
         * TODO Learn Redis to continue ...
         **/

        return 'done';

    }


}
