<?php

namespace App\Exports;

use App\Bom;
use App\Cart;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;

class CartsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $prices = [];
        $names = [];
        $userCart = [];
        $carts = Bom::where('user_id',Auth::guard('user')->id())->first()->carts->pluck('name');
            foreach ($carts as $key => $cart){
                $carts[$key] = unserialize($cart);
            }


                for($c = 0 ; $c<count($carts) ; $c++){


                    for ($i = 0; $i < count($carts[$c]); $i++) {

                        array_push($names,$carts[$c][$i]['name']);

                    }
                }
        $unique_names = array_values(array_unique($names));

        for($c = 0 ; $c<count($unique_names) ; $c++){


            foreach ($carts as $cart) {
                foreach ($cart as $key => $value) {

                    if ($unique_names[$c] == $value['name']) {
                        if (isset($prices[$unique_names[$c]])) {
                            $prices[$unique_names[$c]] += $value['num'];
                        }else{

                            $prices[$unique_names[$c]] = $value['num'];
                        }
                    }
                }
            }


        }

        $userCart[0]['name'] = 'نام قطعه';
        $userCart[0]['num'] = 'تعداد';
                for($c = 1 ; $c<count($prices) ; $c++){

                    $userCart[$c]['name'] = array_keys($prices)[$c-1];
                    $userCart[$c]['num'] = $prices[array_keys($prices)[$c-1]];

                }


//      ----------------------------------------------------------------------
//        $carts = Bom::where('user_id',Auth::guard('user')->id())->first()->carts;
//        for($c = 0 ; $c<count($carts) ; $c++){
//
//                unset($carts[$c]['id']);
//                unset($carts[$c]['bom_id']);
//                unset($carts[$c]['project_id']);
//                unset($carts[$c]['created_at']);
//
//        }

        return collect($userCart);
    }
}
