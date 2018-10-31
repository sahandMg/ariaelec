<?php

namespace App\Imports;

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToModel;

class CartsImport implements ToModel
{
    /**
     * @param array $row
     *
     * @param null $name
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public $project;
        public function __construct($name)
        {
           $this->project = $name;
        }

    public function model(array $row)
    {
        $myArr = [];
        $lostParts = [];
        $enoughParts = [];
        $myArr['keyword'] = [$row[0]];
        $part = DB::table('commons')->where('manufacturer_part_number',$row[0])->first();
        if(is_null($part)){
            array_push($lostParts,$row[0]);
        }else {
            if(!$part->quantity_available > 0){
                array_push($enoughParts,$row[0]);
            }else{
                $myArr['num'] = [$row[1]];
                $myArr['project'] = $this->project;
                $ctrl = new CartController();
                $ctrl->createCart(request(), $myArr);
            }


        }
    }

}
