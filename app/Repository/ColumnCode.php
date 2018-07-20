<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 7/20/18
 * Time: 2:17 AM
 */

namespace App\Repository;
use Illuminate\Support\Facades\DB;

class ColumnCode
{
    public $decode = [];
    public $keys = [];
/*
 * Get the filter from request
 * try to decode the column names
 * Generate the filter array like this :
 *
 *  $filters = [
    'speed' => ['40MHz'],
    'packaging'=>['Tray  Alternate Packaging'],
    'manufacturer'=>['Microchip Technology'],
    'voltage_supply_digital' => ['2 V ~ 5.5 V']
    ];
 */
    public function getFilter($filters){

        $keys = array_keys($filters);
        foreach ($keys as $key){

            $this->findCode($key);
        }
        return array_combine($this->decode,array_values($filters));

    }

    private function findCode($key){

        if(array_key_exists($key,$this->all() )){

            return array_push($this->decode,$this->all()[$key]);

        }
    }

    /*
    * Gets the column name array from database
    */
    public function all(){

        $names = DB::table('column_names')->pluck('column_name');
        $cols = unserialize(json_decode($names,true)[0]);
        return $cols;
    }
    /*
     * Get filter columns from search controller
     * find related codes
     * Generate new array [code => columnName]
     * Send New array to complete search page
     */
    public function sendFilter($filters){
        /*
         * set $keys array as values in $cols array
         */
        $cols = $this->all();

        $values = array_keys($filters);

        for($i=0;$i<count($values);$i++){
        /*
         * finding related codes
         */
           $key = array_search($values[$i],$cols);
            array_push($this->keys,$key);

        }

        return array_combine($this->keys,$values);




    }


}