<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 5/4/18
 * Time: 12:59 PM
 */

namespace App\Repository;


class Slugger
{
//    Send an object instance as a function argument
    public static function setSlug($class)
    {

        $names = $class->pluck('product_name')->toArray();
        $slugs = $class->all();
        for ($i = 0; $i < count($names); $i++) {
            $names[$i] = str_replace('/', ' ', $names[$i]);
            $names[$i] = str_replace(',', '', $names[$i]);
            $names[$i] = str_replace('-', '', $names[$i]);
            $names[$i] = str_replace('(', '', $names[$i]);
            $names[$i] = str_replace(')', '', $names[$i]);
            $names[$i] = str_replace(' ', '-', $names[$i]);
            $names[$i] = str_replace('--', '-', $names[$i]);
            $names[$i] = str_replace('.', '-', $names[$i]);
            $names[$i] = str_replace('+', '', $names[$i]);
        }
        for ($t = 0; $t < count($names); $t++) {

            $slugs[$t]->update(['slug' => $names[$t]]);
        }

        return $names;
    }
}