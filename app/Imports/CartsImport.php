<?php

namespace App\Imports;

use App\Http\Controllers\CartController;
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
        $myArr['keyword'] = [$row[0]];
        $myArr['num'] = [$row[1]];
        $myArr['project'] = $this->project;
        $ctrl = new CartController();
        $ctrl->createCart(request(),$myArr);

    }

}
