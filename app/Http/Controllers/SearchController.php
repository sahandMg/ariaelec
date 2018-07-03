<?php

namespace App\Http\Controllers;


use App\Brief;
use App\Common;
use App\Component;
use App\Detail;
use App\IC\PMIC_Display_Drivers;
use App\Product;
use App\Repository\FilterContent;
use App\Shops\Eshop;
use App\Shops\IranMicro;
use App\Shops\MetaElec;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Shops\GetSiteContent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;


class SearchController extends Controller
{
    public $type;
    public $paginate;
    public $skip = 20;

    public function SearchPartComp(Request $request)
    {

// ------------ Finding the part in database without filter --------------

        $keyword = $request->keyword;
        $this->paginate = $request->num;
        //        Searching Between Products
        $product = DB::table('products')->where('product_name', 'like', "%$keyword%")
            ->join('components', 'components.product_id', '=', 'products.id')
            ->skip(($this->skip * ($this->paginate -1)) )->take($this->skip)->get();

        if ($product->count() > 0) {
            $this->type = '10';
            return [$this->type, $product];
        }
        //        Searching Between Components


        $component = DB::table('components')->where('slug', 'like', "%$keyword%")->get();

        if ( !$component->isEmpty()) {

            for ($i = 0; $i < count($component); $i++) {

                $cName = $component[$i]->slug;
                $cName = str_replace('-', '_', $cName);
                $models[$i] = 'App\IC\\' . $cName;
                $models[$i] = new $models[$i]();
            }
            if (!isset($models)) {

                return 420;
            }

            $models = array_unique($models);
            $models = array_values($models);

            if (count($models) == 1) {
                $models = $models[0];
                    $components = DB::table('components')->where('slug', 'like', "%$keyword%")
                        ->join('commons', 'commons.component_id', '=', 'components.id')
                        ->join($models->getTable(), $models->getTable() . '.' . 'common_id', '=', 'commons.id')
                        ->join('persian_names', 'persian_names.component_id', '=', 'components.id')
                        ->skip(($this->skip * ($this->paginate - 1)))->take($this->skip)->get();
//


                if (isset($components) && $components->count() > 0) {
                    $filters = FilterContent::Filters($models, $components);
                    $this->type = '20';
                    return [$this->type, $components, $filters];
                } else {

                    return '415';
                }

            }
        }


//        Searching Between Parts

                $part = DB::table('commons')
                    ->where('part_number', 'like', "%$keyword%")
                    ->orWhere('manufacturer_part_number', 'like', "%$keyword%")
                    ->orWhere('manufacturer', 'like', "%$keyword%")
                    ->orWhere('description', 'like', "%$keyword%")
                    ->get();

            if ($part->isEmpty()) {

                return 415;
            } else {

                for ($i = 0; $i < count($part); $i++) {
                    $table = DB::table('components')->where('id', $part[$i]->component_id)->first();
                    if($table === null){
                        return 410;
                    }
                    $cName[$i] = $table->slug;
                    $temp = DB::table('components')->join('products','products.id','=','components.product_id')
                        ->where('components.id', $part[$i]->component_id)->first();
                    if($temp == null){
                        return 410;
                    }

                    $cName2[str_replace('-', ' ', $cName[$i])] = $temp->persian_name;
                    $cName2["product$i"] = $temp->product_name;
                    $cName[$i] = str_replace('-', '_', $cName[$i]);
                    $models[$i] = 'App\IC\\' . $cName[$i];
                    $models[$i] = new $models[$i]();

                }

                if (!isset($cName) && !isset($models)) {

                    return 420;
                }


                $models = collect($models)->unique();
                $models = $models->values();

                if (count($models) == 1) {

                    $models = $models [0];

                        $parts = DB::table('commons')->where('part_number', 'like', "%$keyword%")
                            ->orWhere('manufacturer_part_number', 'like', "%$keyword%")
                            ->orWhere('manufacturer', 'like', "%$keyword%")
                            ->orWhere('description', 'like', "%$keyword%")
                            ->join('components', 'commons.component_id', '=', 'components.id')
                            ->join('persian_names', 'persian_names.component_id', '=', 'components.id')
                            ->join($models->getTable(), $models->getTable() . '.' . 'common_id', '=', 'commons.id')
                            ->skip(($this->skip * ($this->paginate - 1)))->take($this->skip)->get();


                    $names = $parts->pluck('names')->toArray();
                    $tableCols = Schema::getColumnListing($models->getTable());
                    array_shift($tableCols);
                    array_pop($tableCols);
                    array_pop($tableCols);
                    array_pop($tableCols);
                    array_pop($tableCols);

                    if (isset($names) && count($names) > 0) {
                            $names = array_unique($names);

                                $names = unserialize($names[0]);
//
                    }

                    if (!isset($parts) || $parts->isEmpty()) {
                        return 415;
                    } else {
                        $filters = FilterContent::Filters($models,$parts);
                        //        ----------------  Finding the part in websites  -------------------

                        //            $crawled = new GetSiteContent();
                        //            $crawlers = $crawled->getSite($keyword);
                        //            if ($crawlers == 0) {
                        //                return 435;
                        //            }
                        //        Sending keyword and crawled response to crawlSite method in shop directory classes
                        //            for ($i = 0; $i < count($crawlers); $i++) {
                        //                $className = array_keys(GetSiteContent::$website)[$i];
                        //                $list[$i] = $className::crawlSite($crawlers[$i], $keyword);
                        //            }
                        //            if (isset($list)) {
                        //                $this->type = '30';
                        //                return [$this->type, $parts,$filters];
                        //
                        //            } else {
                        //                return 420;
                        //            }
                        $this->type = '30';

                        for($t=0;$t<count($parts);$t++){
                            unset(
                                $parts[$t]->names,
                                $parts[$t]->id,
                                $parts[$t]->component_id,
                                $parts[$t]->common_id,
                                $parts[$t]->links,
                                $parts[$t]->product_id,
                                $parts[$t]->model,
                                $parts[$t]->created_at,
                                $parts[$t]->updated_at

                            );
                        }

                        return [$this->type, $parts, $filters, $names ,$tableCols];
                    }

                }else{

                return array_unique($cName2);
                }
            }
    }

    public function getPrice(Request $request){
        $stop = 0;
        $start = Carbon::now();
        $command = "cd /var/www/html/ariaelec/public/V1 && node index.js $request->keyword";
        while ($stop == 0) {

            exec($command, $output, $return);
            if (count($output) != 0) {
                $stop = 1;
            }
            elseif(Carbon::now()->diffInSeconds($start) > 5){
                return 435;
            }
        }

        return $output;

    }

    public function SearchPart(Request $request){
        $keyword = $request->keyword;
        $product = DB::table('products')->where('product_name', 'like', "%$keyword%")
            ->join('components', 'components.product_id', '=', 'products.id')->get();

        if(!$product->isEmpty()){
            $this->type = '10';
            return [$this->type,$product];
        }


        $component = DB::table('components')->where('name', 'like', "%$keyword%")
            ->join('commons', 'commons.component_id', '=', 'components.id')
            ->get();
        if(count($component) > 0){
            $this->type = '20';
            return [$this->type,$component,];

        }

        $part = DB::table('commons')
            ->where('part_number', 'like', "%$keyword%")
            ->orWhere('manufacturer_part_number', 'like', "%$keyword%")
            ->orWhere('manufacturer', 'like', "%$keyword%")
            ->orWhere('description', 'like', "%$keyword%")
            ->join('components', 'commons.component_id', '=', 'components.id')
            ->get();

        if ($part->isEmpty()) {

            return 415;
        } else {
            $this->type = '30';
            return [$this->type,$part];
        }
    }

    public function findArticle(Request $request){
        $keyword = $request->keyword;
        $briefs = DB::table('briefs')->where('title','like',"%$keyword%")
        ->orWhere('abstract','like',"%$keyword%")
        ->orWhere('category','like',"%$keyword%")
        ->orWhere('product','like',"%$keyword%")
            ->join('details','details.brief_id','briefs.id')->get();
        if($briefs->isEmpty()){
            $content = DB::table('details')->where('text','like',"%$keyword%")
                ->join('briefs','details.brief_id','briefs.id')->get();
            if($content->isEmpty()){
                return 417;
            }else{
                return $content;
            }
        }else{

            if($briefs->count() > 0 && $briefs->pluck('category')->unique()->count() > 1){
                return $briefs->pluck('category');

            }else{

                return $briefs;
            }
        }

    }

    public function filterPart(Request $request){
        $filters = [

            'speed' => ['40MHz'],
//            'packaging'=>['Tray  Alternate Packaging'],
            'manufacturer'=>['Microchip Technology'],
//        'voltage_supply_digital' => ['2 V ~ 5.5 V']

        ];
        $component = 'Embedded-Microcontrollers';
        $component = DB::table('components')->where('slug','like',"%$component%")->first();
        if($component == null ){
            return 410;
        }
//        Create class path from class string name --> App\IC\PMIC_Display_Drivers
        $class = 'App\IC\\'.str_replace('-','_',$component->slug);
//        Class Name --> PMIC_Display_Drivers
        $className = str_replace('-','_',$component->slug);
        $model = new $class();
        $commonTableCols = Schema::getColumnListing('commons');

//        Gets related model table name --> create__pmic_display_drivers__table
        $sepTableCols = Schema::getColumnListing($model->getTable());

        $common = DB::table('commons')->get();

        $separate = DB::table($model->getTable())->get();
        $cFlag = [];
        $sFlag = [];
//    $result = [];
//    $ids = [];


        for($i=0 ; $i < count($commonTableCols) ; $i++){
            for($t=0 ; $t<count($filters);$t++) {
//  Checking filter keys with common table column names to findout whether the common table needs to be filtered or not
                similar_text(array_keys($filters)[$t], $commonTableCols[$i], $percent);
                if ($percent >= 80) {
                    array_push($cFlag, array_keys($filters)[$t]);
                    $cFlag = array_unique($cFlag);
                    $cFlag = array_values($cFlag);
                }
            }
        }
        for($i=0 ; $i < count($sepTableCols) ; $i++){
            for($t=0 ; $t<count($filters);$t++) {
//  Checking filter keys with separate tables column names to findout whether the tables need to be filtered or not
                similar_text(array_keys($filters)[$t], $sepTableCols[$i], $percent);
                if($percent >= 80){
                    array_push($sFlag, array_keys($filters)[$t]);
                    $sFlag = array_unique($sFlag);
                    $sFlag = array_values($sFlag);
                }
            }
        }

        if($cFlag){
            for($i=0;$i<count($cFlag);$i++) {

                if(count($filters[$cFlag[$i]]) > 1) {
                    for ($j = 0; $j < count($filters[$cFlag[$i]]); $j++) {

                        if ($j == count($filters[$cFlag[$i]]) - 1) {
                            break;
                        }

                        $common = $common->whereIn($cFlag[$i], [$filters[$cFlag[$i]][$j], $filters[$cFlag[$i]][$j + 1]])
                            ->where('model',str_replace('-',' ',$component->slug));

                    }
                }else{

//                for($i=0;$i<count($cFlag);$i++) {
                    for ($j = 0; $j < count($filters[$cFlag[$i]]); $j++) {


                        $common = $common->where($cFlag[$i], $filters[$cFlag[$i]][$j])->where('model',str_replace('-',' ',$component->slug));

                    }

                }
            }
            $common = array_values($common->all());

            for($i=0;$i<count($common);$i++){

                $ids[$i] = $common[$i]->id;

            }
        }

        if($sFlag){
            for($i=0;$i<count($sFlag);$i++) {

                if(count($filters[$sFlag[$i]]) > 1){

                    for ($j = 0; $j < count($filters[$sFlag[$i]]); $j++) {

                        if ($j == count($filters[$sFlag[$i]]) - 1) {
                            break;
                        }
                        $separate = $separate->whereIn($sFlag[$i], [$filters[$sFlag[$i]][$j],$filters[$sFlag[$i]][$j+1]]);
                    }
                }else{
                    for ($j = 0; $j < count($filters[$sFlag[$i]]); $j++) {
                        $separate = $separate->where($sFlag[$i], $filters[$sFlag[$i]][$j]);
                    }
                }

            }
            $separate = array_values($separate->all());

            for($i=0;$i<count($separate);$i++){

                $result[$i] = DB::table('commons')->where('id',$separate[$i]->common_id)->first()->id;

            }
        }

        if (isset($ids)  && isset($result)) {
            $sameIds = array_intersect($result, $ids);

        }elseif(isset($ids) && $sFlag == null){

            $sameIds = $ids;
        }elseif(isset($result) && $cFlag == null){
            $sameIds = $result;
        }else{

            return 415;
        }
        $sameIds = array_values($sameIds);

        for ($i = 0; $i < count($sameIds); $i++) {
//
//            $parts[$i] = Common::where('id', $sameIds[$i])->with($className)->first();

            $parts[$i] =DB::table('commons')->where('commons.id', $sameIds[$i])
                ->join($model->getTable(),'commons.id','=',$model->getTable().'.'.'common_id')
                ->first();
        }
        if (!isset($parts)) {
            return '415';
        } else {

//ساخت مجدد محتوای فیلترها بر اساس نتیجه جستجو شده

            $commonTableCols = Schema::getColumnListing('commons');

            $sepTableCols = Schema::getColumnListing($model->getTable());

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
                for ($i = 0; $i < count($parts); $i++) {
                    $colName = $commonTableCols[$t];
                    $cols[$commonTableCols[$t]][$i] = $parts[$i]->$colName;
                    $cols[$commonTableCols[$t]] = array_unique($cols[$commonTableCols[$t]]);
                    $cols[$commonTableCols[$t]] = array_values($cols[$commonTableCols[$t]]);
                }
            }

            for ($t = 0; $t < count($sepTableCols); $t++) {
                for ($i = 0; $i < count($parts); $i++) {
                        $colName = $sepTableCols[$t];
                        $sepCols[$sepTableCols[$t]][$i] = $parts[$i]->$colName;
                        $sepCols[$sepTableCols[$t]] = array_unique($sepCols[$sepTableCols[$t]]);
                        $sepCols[$sepTableCols[$t]] = array_values($sepCols[$sepTableCols[$t]]);
                }
            }

            if (!isset($cols) || !isset($sepCols)) {
                return '420';
            } else {

                $result = array_merge($parts,$cols,$sepCols);
                return $result;
            }
        }
    }

    public function sort(Request $request)
    {
//        باید دیتا ها رو ۲۰ تا ۲۰ تا سورت کنی

        $class = 'App\IC\\'.$request->component;
        $paginate = $request->num;
        $order = $request->order;
        $model = new $class();
        $colName = $request->colName;

        $component = DB::table($model->getTable())->get();
        if($component == null){
            return '410';
        }else{

            for($i=0 ; $i < count($component) ; $i++){

                $cols[$component[$i]->id] = $component[$i]->$colName;
                $cols[$component[$i]->id] = str_replace('~','',$cols[$component[$i]->id]);
                $volts[$component[$i]->id] = explode(" ",$cols[$component[$i]->id])[0];
            }
//            $volts = not common table Ids
            if($order == 'decs'){

                arsort($volts);
            }else{
                asort($volts);
            }

            $volts = array_keys($volts);
            $newVolts = array_slice($volts,20*($paginate-1),20);
            for($i=0 ;$i<count($newVolts);$i++){
                $rows[$i] = DB::table($model->getTable())
                    ->where($model->getTable().'.'.'id','=',$newVolts[$i])
                    ->join('commons','commons.id','=',$model->getTable().'.'.'common_id')->first();
            }
            if(isset($rows)){

                return $rows;
            }else{
                return 420;
            }
        }

    }
}