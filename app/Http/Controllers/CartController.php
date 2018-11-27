<?php

namespace App\Http\Controllers;

use App\Bom;
use App\Cart;
use App\Exports\CartsExport;
use App\Imports\CartsImport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Morilog\Jalali\Jalalian;

class CartController extends Controller
{
    /**
     * Controls Carts + BOMs + Projects
     * @internal param Request $request
     */
    public $cart = [];

    public function __construct()
    {
        $this->middleware('guest');
    }
/*
 * Add registered user order to cart
 * use createCart method
 *
 */
    public function addToCart(Request $request){
        $fault = [];
        $carts = $request->cart;
        for($i=0;$i<count($carts);$i++){
            for($t=0;$t<count($carts[$i]);$t++){
                unset($request['cart']);
                $request['keyword'] = $carts[$i][$t]['keyword'];
                $request['num'] = $carts[$i][$t]['num'];
                $request['project'] = $carts[$i][$t]['project'];
                $this->cart = [];
                $resp = $this->createCart($request);
//                Checks if quantity is available
                if($resp != 200){
                     array_push($fault,' وجود ندارد '.$request->keyword.' در حال حاضر این تعداد از قطعه ');
                }
            }
        }
        if(count($fault) == 0){
            return 200;
        }else{

            return $fault;
        }
    }

    /*
     * Gets num + keyword + token + project = NULL || Project name
     * check parts price from price api
     * check parts availability with the requested number
     * Get project_id from project name in $request->project
     */
    public function createCart(Request $request=null,$arr=null){
        /**
         * BOM Bill Of Materials
         * status = 0 -> BOM : open
         * status = 50 -> BOM : closed
         * status = 100 -> BOM : closed
         */
        if(!is_null($arr)){
            $request['keyword'] = $arr['keyword'][0];
            $request['num'] = $arr['num'][0];
            if(!is_null($arr['project'])){
                $request['project'] = $arr['project'];
            }
        }

        if(count(Auth::user()->boms) > 0 ){
            $bom = Bom::where('user_id', Auth::guard('user')->id())->orderBy('created_at','decs')->first();
            /*
             * status != 0 means that the last BOM has closed
             */

            if($bom->status != 0){
                $bom = new Bom();
                $bom->status = 0;
                $bom->user_id =  Auth::guard('user')->id();
                $bom->price = 0;
                $bom->order_number = rand(100,10000);
                $bom->save();
            }
        }else{
            $bom = new Bom();
            $bom->status = 0;
            $bom->user_id =  Auth::guard('user')->id();
            $bom->price = 0;
            $bom->order_number = rand(100,10000);
            $bom->save();
        }
        $quantity = get_object_vars(DB::table('commons')->where('manufacturer_part_number',$request->keyword)->first())['quantity_available'];
        if( $quantity < $request->num){

            return 'موجود نمی باشد'.' '.$request->keyword.' '.'در حال حاضر این تعداد از';
        }

        array_push($this->cart ,[
            'name'  =>  $request->keyword,
            'num'   =>  $request->num,
        ]);


        $orders = DB::table('carts')->where('bom_id',$bom->id)->get();
        /*
         * New order registration
         */

        if(count($orders) == 0){
            $cart = new Cart();
            $cart->name = serialize($this->cart);
            $cart->bom_id = $bom->id;
            if (!is_null($request->project)) {
                $projectId = DB::table('projects')->where('name', $request->project)->first()->id;
                $cart->project_id = $projectId;
            }
            $cart->save();

            return 200;
        }
        /*
         * Update last order
         */
        else{
            /*
            * TODO if user , orders parts for two or more projects at a same time then ???
            */

            if (!is_null($request->project)) {

                $project = DB::table('projects')->where('name', $request->project)->where('user_id',  Auth::guard('user')->id())->first();
                if($project){
                    $projectId = $project->id;
                }else{
                    return 'project not found';
                }
                foreach ($orders as $order){
                    if($order->project_id == $projectId){
                        $userOrder = $order;
                    }
                }
                if(!isset($userOrder)){
                    /*
                     * create separate cart for project
                     */
                    $cart = new Cart();
                    $cart->name = serialize($this->cart);
                    $cart->bom_id = $bom->id;
                    $cart->project_id = $projectId;
                    $cart->save();
                    return 200;
                }else{
                    /*
                     * update the project cart
                     */

                    $this->updateCart($userOrder,$request,$bom);
                    return 200;
                }

//
//
            }else{

                foreach ($orders as $order){
                    if($order->project_id == 0 ){
                        $userOrder = $order;
                    }
                }

                if(isset($userOrder)) {
                    $this->updateCart($userOrder,$request,$bom);
                }else{
                    $cart = new Cart();
                    $cart->name = serialize($this->cart);
                    $cart->bom_id = $bom->id;
                    $cart->save();

                }
                return 200;
            }

            /*
             * update a cart data without project_id
             * check all carts name for a given BOM id and a given part name
             */

        }

//
        /**
         * TODO Get user address in future
         * TODO if num > quantity available ??
         * TODO BOM total price
         */
    }

    // Getting new Prices when ever the cart page, gets refreshed
    public function readCart(Request $request){

        try{
            $bom = Bom::where('user_id', Auth::guard('user')->id())->where('status',0)->firstOrFail();
        }catch (\Exception $exception){
            return [];
        }
        if(count($bom->carts) != 0){
            $carts = $bom->carts;

        }else{
            return [];
        }


        for($i=0 ; $i<count($carts) ;$i++){
            $orders[$i] =array_values(unserialize($carts[$i]->name));

            for($t=0 ; $t<count($orders[$i]);$t++){
                $orders[$i][$t]['keyword'] = $orders[$i][$t]['name'];
                unset($orders[$i][$t]['name']);
                $request['keyword'] = $orders[$i][$t]['keyword'];
                $ctrl = new SearchController();
//                    /*
//                     *
//                     * TODO get_object_vars() --> cannot use object of type stdclass as array
//                     * if part could not be found
//                     */

                if(gettype($ctrl->getPrice($request)) == 'integer'){
                    $orders[$i][$t]['price'] = 0;
                }
                else{

                    $vars = json_decode($ctrl->getPrice($request),true);
                    $orders[$i][$t]['price'] =  $vars['unit_price'];
                    if($carts[$i]->project_id != 0 ){

                        $projs[$i] = DB::table('projects')->where('id',$carts[$i]->project_id)->first()->name;
                        $orders[$i][$t]['project'] =  $projs[$i];

                    }
                    else{
                        $orders[$i][$t]['project'] = null;
                    }

                }
                if($orders[$i][$t]['price'] == null){
                    $orders[$i][$t]['price'] = 0;
                }

            }


        }
        return $orders;



    }
/*
 *
 *  uses for updating cart data
 */

    protected function updateCart($userOrder,$request,$bom)
    {
  //TODO all carts in a Bom will get update :(

        if (isset($userOrder)) {
            session()->forget('check');
            $cartArray = array_values(unserialize($userOrder->name));
            for ($i = 0; $i < count($cartArray); $i++) {
                if ($cartArray[$i]['name'] == $request->keyword) {
                    session()->put('check' ,$i);
                }
            }
            if (session()->has('check')) {
                $quantity = get_object_vars(DB::table('commons')->where('manufacturer_part_number',$cartArray[session('check')]['name'])->first())['quantity_available'];
                if( $quantity < $cartArray[session('check')]['num']){
                    return 'موجود نمی باشد'.' '.$request->keyword.' '.'در حال حاضر این تعداد از';
                }
                $cartArray[session('check')]['num'] = $cartArray[session('check')]['num'] + $request->num;
                DB::table('carts')->where('bom_id', $bom->id)
                    ->where('project_id',$userOrder->project_id)
                    ->update(['name' => serialize($cartArray)]);

            } else {
                array_push($cartArray, $this->cart[0]);
                DB::table('carts')->where('bom_id', $bom->id)
                    ->where('project_id',$userOrder->project_id)
                    ->update(['name' => serialize($cartArray)]);

            }
        }
    }

    protected function cartWithoutToken($request){
        /*
         * Create a bom query with user_id = 0
         * create cart with user_id = 0
         * use session to store user cart
         */


        if(!session()->has('guestBom')){

            $bom = new Bom();
            $bom->status = 0;
            $bom->order_number = rand(100,10000);
            $bom->save();
            session()->put(['guestBom'=>$bom]);
        }



        array_push($this->cart ,[
            'name'  =>  $request->keyword,
            'num'   =>  $request->num,
        ]);

        $order = DB::table('carts')->where('bom_id',$bom->id)->first();
        /*
         * New order registration
         */
        if(!$order){
            $cart = new Cart();
            $cart->name = serialize($this->cart);
            $cart->bom_id = $bom->id;
            $cart->save();

            return 200;
        }
        /*
         * Update last order
         */
        else{
            /*
            * TODO if user , orders parts for two or more projects at a same time then ???
            */


                    /*
                     * update the project cart
                     */

                    $this->updateCart($order,$request,$bom);
                return 200;
            }

            /*
             * update a cart data without project_id
             * check all carts name for a given BOM id and a given part name
             */


    }

    // Deletes an item in a cart using a keyword and a project name

    public function editCart(Request $request){
        $content = [];
        if(!is_null($request->project)){
            $id = DB::table('projects')->where('name',$request->project)->first()->id;
            $project_name = DB::table('projects')->where('name',$request->project)->first()->name;
            $cart = Bom::where('user_id', Auth::guard('user')->id())->where('status',0)->first()->carts->where('project_id',$id)->first();
            if(is_null($cart)){
                return 'cart not found';
            }
           $items = array_values(unserialize($cart->name));
            for ($i=0;$i<count($items);$i++){
                $items[$i]['project']=$project_name;
                if($items[$i]['name'] == $request->keyword){
                    unset($items[$i]);
                }
            }
            $cart->update(['name'=>serialize($items)]);
            $carts = Bom::where('user_id',Auth::guard('user')->id())->where('status',0)->first()->carts;
            foreach ($carts as $cart){
                array_push($content,array_values(unserialize($cart->name)));
            }

            return array_values(array_filter($content));
        }else{

           $cart = Bom::where('user_id', Auth::guard('user')->id())->where('status',0)->first()->carts->where('project_id',0)->first();
            if(is_null($cart)){
                return 'cart not found';
            }
            $items = array_values(unserialize($cart->name));
            for ($i=0;$i<count($items);$i++){
                $items[$i]['project']= null;
                if($items[$i]['name'] == $request->keyword){
                    unset($items[$i]);
                }

            }
            $cart->update(['name'=>serialize($items)]);
            $carts = Bom::where('user_id',Auth::guard('user')->id())->where('status',0)->first()->carts;
            foreach ($carts as $cart){
                array_push($content,array_values(unserialize($cart->name)));
            }
            return array_values(array_filter($content));
        }



    }
    // Gets token
    // get all carts related to the user bom
    // calculate total price and update bom price column
    // close bom state
    // add price to cart parts
    public function confirm(Request $request){

        if(is_null(Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first())){
            return 'سبد خرید پیش از این پردازش شده است';
        }
        $totalPrice = 0;
        $itemArr = [];
        // check if the requested quantity is available or not
        $resp = $this->availability();
        if($resp != 200 ){
            return $resp;
        }
        $carts = Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->carts;
        for($i=0;$i<count($carts);$i++){
            $items = array_values(unserialize($carts[$i]->name));
            // check each item price in a loop
            for($t=0;$t<count($items);$t++){
                $price = get_object_vars(DB::table('commons')->where('manufacturer_part_number',$items[$t]['name'])->first())['unit_price'];
                $quantity = get_object_vars(DB::table('commons')->where('manufacturer_part_number',$items[$t]['name'])->first())['quantity_available'];
                $items[$t]['price'] = $price;
                    DB::table('commons')->where('manufacturer_part_number',$items[$t]['name'])->update(['quantity_available'=>$quantity - $items[$t]['num'] ]);
                array_push($itemArr,$items[$t]);
                $totalPrice = $totalPrice + $price * $items[$t]['num'];
            }

            $carts[$i]->update(['name'=>serialize($itemArr)]);
            $itemArr = [];
        }
        Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->update(['price'=>$totalPrice]);
        $order_number = Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->order_number;
        Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->update(['status'=>50]);
//      Updating user information Tel & Address
        $address = $request->address;
        $phone = $request->phone;
        DB::table('addresses')->insert([
            'address'=> $address,
            'user_id'=>  Auth::guard('user')->id(),
            'created_at'=> Carbon::now()
        ]);

        DB::table('users')->where('id', Auth::guard('user')->id())->update(['phone'=>$phone]);

        // TODO CLEAN THE LINE BELLOW && redirect to localhost/user/follow-up after transaction gate
        return ['price'=>$totalPrice,'number'=>$order_number];
    }

    protected function availability(){
        $itemArr = [];
        $carts = Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->carts;
        for($i=0;$i<count($carts);$i++) {
            $items = array_values(unserialize($carts[$i]->name));
            // check each item price in a loop
            for ($s = 0; $s < count($items); $s++) {
                if(array_key_exists($items[$s]['name'],$itemArr)){
                    $itemArr[$items[$s]['name']] = $itemArr[$items[$s]['name']] + $items[$s]['num'];
                }else{

                    $itemArr[$items[$s]['name']] = $items[$s]['num'];
                }
                $quantity = get_object_vars(DB::table('commons')->where('manufacturer_part_number', $items[$s]['name'])->first())['quantity_available'];
                // check if the requested quantity is available
                if ( $itemArr[$items[$s]['name']] > $quantity) {
//
                    return 'موجود نمی باشد' . ' ' . $items[$s]['name'] . ' ' . 'در حال حاضر این تعداد از';
                }

            }
        }
        return 200;
    }
// Calculate total BOM price for final confirmation
    public function price(){

        if(is_null(Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first())){
            return 'سبد خرید پیش از این پردازش شده است';
        }
        $totalPrice = 0;
        $itemArr = [];
        // check if the requested quantity is available or not
        $resp = $this->availability();
        if($resp != 200 ){
            return $resp;
        }
        $carts = Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->carts;
        for($i=0;$i<count($carts);$i++){
            $items = array_values(unserialize($carts[$i]->name));
            // check each item price in a loop
            for($t=0;$t<count($items);$t++){
                $price = get_object_vars(DB::table('commons')->where('manufacturer_part_number',$items[$t]['name'])->first())['unit_price'];
                $items[$t]['price'] = $price;
                array_push($itemArr,$items[$t]);
                $totalPrice = $totalPrice + $price * $items[$t]['num'];
            }
        }
        $order_number = Bom::where([['user_id', Auth::guard('user')->id()],['status',0]])->first()->order_number;
        return ['price'=>$totalPrice,'number'=>$order_number];
    }
// send user Boms
    public function getUserBom(){

        $boms = DB::table('boms')->where('user_id',Auth::guard('user')->id())->get();

        if(sizeof($boms) == 0){

            return '404';
        }else{

            foreach ($boms as $bom){

                $bom->created_at = Jalalian::forge($bom->created_at)->toString();
            }


            return $boms;
        }

    }
//    Get token,order_number and return user cart
    public function getUserBill(Request $request){

        try{

            $carts = Bom::where('order_number',$request->order_number)->first()->carts;
            $bom = Bom::where('order_number',$request->order_number)->first();
        }catch (\ErrorException $exception){

            return 'ORDER NUMBER NOT FOUND!';
        }

//        $userCart = [];
        for ($t=0;$t<count($carts);$t++){
            if($carts[$t]['project_id'] != 0){
                $temp = array_values(unserialize($carts[$t]->name));
                $prjName = DB::table('projects')->where('id',$carts[$t]['project_id'])->first()->name;
                for($i=0 ; $i<count($temp);$i++){
                    $temp[$i]['keyword'] = $temp[$i]['name'];
                    unset($temp[$i]['name']);
                    $temp[$i]['project'] = $prjName;
                }
                $userCart[$t] = $temp;
            }else{
                $temp = array_values(unserialize($carts[$t]->name));
                for($i=0 ; $i<count($temp);$i++){
                    $temp[$i]['keyword'] = $temp[$i]['name'];
                    unset($temp[$i]['name']);
                    $temp[$i]['project'] = null;
                }
                $userCart[$t] = $temp;

            }


        }
         array_push($userCart,['order_number'=>$bom->order_number,
             'date'=>Jalalian::forge($bom->updated_at)->toString(),
             'totalPrice'=>$bom->price
         ]);
        return ($userCart);
    }

    public function Excel_export(){
        return Excel::download(new CartsExport, 'carts.xlsx');
    }
// Gets token,name(file name),project and imports data to carts table
    public function Excel_import(Request $request){

//        put the excel file in storage/imports
//      Get the file name from user
//        Get project name
        Excel::import(new CartsImport($request->project),'/imports/carts.xlsx');

        return 200;

    }
}
