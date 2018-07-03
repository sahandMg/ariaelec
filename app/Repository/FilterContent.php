<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 6/21/18
 * Time: 12:10 PM
 */

namespace App\Repository;


use Illuminate\Support\Facades\Schema;

class FilterContent
{

//    model => new App\IC\Audio_Special_Purpose
//    $parts => All common table parts
 public static function Filters($models,$parts){
     $commonTableCols = Schema::getColumnListing('commons');


         $sepTableCols = Schema::getColumnListing($models->getTable());
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
         $j = 0;
         for ($i = 0; $i < count($parts); $i++) {
             $colName = $commonTableCols[$t];
             $temp = json_decode($parts,true);
             $cols[$commonTableCols[$t]][$j] = $temp[$i][$colName];
            $j++;
         }
         $cols[$commonTableCols[$t]] = array_unique($cols[$commonTableCols[$t]]);
         $cols[$commonTableCols[$t]] = array_values($cols[$commonTableCols[$t]]);
     }

     for ($j = 0; $j < count($sepTableCols); $j++) {

             for($i=0;$i<count($parts);$i++){
                 $temp = json_decode($parts,true);
                 $sepCols[$sepTableCols[$j]][$i] = $temp[$i][$sepTableCols[$j]];
                 $sepCols[$sepTableCols[$j]] = array_unique($sepCols[$sepTableCols[$j]]);
                 $sepCols[$sepTableCols[$j]] = array_values($sepCols[$sepTableCols[$j]]);
             }
         }

     if (!isset($cols) || !isset($sepCols)) {
         return '420';
     } else {

         $result = array_merge($cols,$sepCols);
         return $result;
     }

 }
}