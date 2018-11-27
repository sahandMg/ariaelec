<?php

namespace App\Imports;

use App\Component;
use App\SubCategory;
use Illuminate\Support\Facades\Cache;
use Maatwebsite\Excel\Concerns\ToModel;

class ComponentsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public $subcategory=[];
    public $category=[];
    public $underlay=[];
    public $product=[];
    public function model(array $row)
    {

//        removes the "*" character at the end of the string

//            if(str_split($row[0])[strlen($row[0])-1] == '*' || str_split($row[0])[strlen($row[0])-2] == '*'){
//               $row[0] = mb_substr($row[0],0,-1);
//            }
//////
//////        Gets the part that defined after the last "*"
//        if(substr_count($row[0],'*') > 0){
//            $star_num = substr_count($row[0],'*');
//
//            if($star_num%2 == 0){
//
//                $explosion = explode('*',$row[0]);
//                $row[0] = implode('_',array_splice($explosion, count($explosion) - 2, 2 ));
//            }
//            if($star_num%2 == 1){
//                $explosion = explode('*',$row[0]);
//                $row[0] = implode('_',array_splice($explosion, 0, 2 ));
//            }
//
//        }
//
//        $row[0] = str_replace(' ','_', $row[0]);
//        $row[0] = str_replace('__','_', $row[0]);
//        $row[0] = str_replace('-','_', $row[0]);
//        $row[0] = str_replace('*','_', $row[0]);
//        $row[0] = str_replace('__','_', $row[0]);
//        $row[0] = str_replace('(','', $row[0]);
//        $row[0] = str_replace(')','', $row[0]);
//        $row[0] = str_replace('/','_', $row[0]);
//        $row[0] = str_replace('+','', $row[0]);
//        $row[0] = str_replace('__','_', $row[0]);
//
//
////
////
//        $component = new Component();
//        $component->name = $row[0];
//        $component->save();
//


/*
 *      This code removes the "_" character from beginning of the string
 *      DON'T FORGET TO COMMENT THE " $component->save() " LINE BEFORE RUNNING THE CODE BELLOW
 */


//                    ----------------------------------------------

//
//        $components = Component::all();
//        foreach ($components as $component){
//            if(substr($component->name,0,1) == '_'){
//                $characters = explode('_',$component->name);
//                unset($characters[0]);
//                $characters = implode("_",$characters);
//                $component->update(['name' => $characters]);
//            }
//            print_r('<pre>'.$component->name.'</pre>');
//        }



/*  --------------------------------------_________--------_____--_--_-_____-_-------_-________-_-_

                            USE THIS CODE TO FILL SUBCATEGORIES TABLE
*/
//        $this->subcategories($row);
//  --------------------------------------_________--------_____--_--_-_____-_-------_-________-_-_


        /*  --------------------------------------_________--------_____--_--_-_____-_-------_-________-_-_

                                    USE THIS CODE TO FILL CATEGORIES TABLE
        */

//        $this->category($row);


        /*  --------------------------------------_________--------_____--_--_-_____-_-------_-________-_-_

                                           USE THIS CODE TO FILL UNDERLAY TABLE
               */
//        $this->underlay($row);

        /*  --------------------------------------_________--------_____--_--_-_____-_-------_-________-_-_

                                   USE THIS CODE TO FILL PRODUCT TABLE
       */
        $this->product($row);
    }


    protected function subcategories($row){


        if(str_split($row[0])[strlen($row[0])-1] == '*' || str_split($row[0])[strlen($row[0])-2] == '*'){
               $row[0] = mb_substr($row[0],0,-1);
            }
//
//        Gets the part that defined after the last "*"

        if(substr_count($row[0],'*') > 0){
            $star_num = substr_count($row[0],'*');

            if($star_num%2 == 0){

                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 1, 1 ));
            }
            if($star_num%2 == 1){
                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 1, 1 ));
            }

        }

        $row[0] = str_replace(' ','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('-','_', $row[0]);
        $row[0] = str_replace('*','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('(','', $row[0]);
        $row[0] = str_replace(')','', $row[0]);
        $row[0] = str_replace('/','_', $row[0]);
        $row[0] = str_replace('+','', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);

//     Unique the subcategories array

        array_push($this->subcategory,$row[0]);
        Cache::put('subcategory',$this->subcategory,1);
        print_r('<pre>'.$row[0].'</pre>');
    }

    protected function category($row){

        if(str_split($row[0])[strlen($row[0])-1] == '*' || str_split($row[0])[strlen($row[0])-2] == '*'){
            $row[0] = mb_substr($row[0],0,-1);
        }
//
//        Gets the part that defined after the last "*"

        if(substr_count($row[0],'*') > 0){
            $star_num = substr_count($row[0],'*');

            if($star_num%2 == 0){

                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 0, 1 ));
            }
            if($star_num%2 == 1){
                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 0, 1 ));
            }

        }

        $row[0] = str_replace(' ','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('-','_', $row[0]);
        $row[0] = str_replace('*','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('(','', $row[0]);
        $row[0] = str_replace(')','', $row[0]);
        $row[0] = str_replace('/','_', $row[0]);
        $row[0] = str_replace('+','', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);

//     Unique the subcategories array
        array_push($this->category,$row[0]);
        Cache::put('category',$this->category,1);
        print_r('<pre>'.$row[0].'</pre>');

}

    protected function underlay($row){


        if(str_split($row[0])[strlen($row[0])-1] == '*' || str_split($row[0])[strlen($row[0])-2] == '*'){
            $row[0] = mb_substr($row[0],0,-1);
        }
//
//        Gets the part that defined after the last "*"

        if(substr_count($row[0],'*') > 0){
            $star_num = substr_count($row[0],'*');

            if($star_num%2 == 0){

                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 2, 1 ));
            }
            if($star_num%2 == 1){
                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 1, 1 ));
            }

        }

        $row[0] = str_replace(' ','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('-','_', $row[0]);
        $row[0] = str_replace('*','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('(','', $row[0]);
        $row[0] = str_replace(')','', $row[0]);
        $row[0] = str_replace('/','_', $row[0]);
        $row[0] = str_replace('+','', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);

//     str_random avoids duplication in array elements
        array_push($this->underlay,$row[0].'&'.str_random(3));
        Cache::put('underlay',$this->underlay,1);
        print_r('<pre>'.$row[0].'</pre>');
    }

    protected function product($row){

        if(substr_count($row[0],'*') > 0){
            $star_num = substr_count($row[0],'*');

            if($star_num%2 == 0){

                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 0, 1 ));
            }
            if($star_num%2 == 1){
                $explosion = explode('*',$row[0]);
                $row[0] = implode('_',array_splice($explosion, 0, 1 ));
            }

        }

        $row[0] = str_replace(' ','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('-','_', $row[0]);
        $row[0] = str_replace('*','_', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);
        $row[0] = str_replace('(','', $row[0]);
        $row[0] = str_replace(')','', $row[0]);
        $row[0] = str_replace('/','_', $row[0]);
        $row[0] = str_replace('+','', $row[0]);
        $row[0] = str_replace('__','_', $row[0]);

//     str_random avoids duplication in array elements
        array_push($this->product,$row[0]);
        Cache::put('product',$this->product,1);
        print_r('<pre>'.$row[0].'</pre>');
    }
}
