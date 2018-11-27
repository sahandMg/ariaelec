<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 11/10/18
 * Time: 10:36 PM
 */

namespace App\Imports;


use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Concerns\ToModel;

class CommonsImport implements ToModel
{
    public $mymodel;
    public function __construct($model)
    {
        $this->mymodel = $model;
    }

    public function model(array $row)
    {
        $myModel = 'App\IC\\'.$this->mymodel;
        $instance = new $myModel();
        // dd($myModel);
        // dd($instance->getTable());
        // dd($row);


        $cNames = Schema::getColumnListing($instance->getTable());
        array_shift($cNames);
        array_pop($cNames);
        array_pop($cNames);
        array_pop($cNames);
        array_pop($cNames);
            // dd($cNames);
        for($r=0;$r<count($cNames);$r++){
            $instance[$cNames[$r]] = $row[$r];
            $instance->common_id = 1;
            $instance->product_id = 1;
            $instance->save();
        }
    }
}
