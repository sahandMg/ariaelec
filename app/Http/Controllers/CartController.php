<?php

namespace App\Http\Controllers;

use App\Bom;
use App\Cart;
use App\Project;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

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
     * Get num + TRUE part keyword
     * check parts price from price api
     * check parts availability with the requested number
     * Get project_id from project name in $request->project
     */
    public function createCart(Request $request){


        /**
         * status = 0 -> BOM : open
         * status = 50 -> BOM : closed
         * status = 100 -> BOM : closed
         */

        if(count(Auth::user()->boms) > 0 ){
            $bom = Bom::where('user_id',Auth::id())->orderBy('created_at','decs')->first();
            /*
             * status != 0 means that the last BOM has closed
             */
            if($bom->status != 0){
                $bom = new Bom();
                $bom->status = 0;
                $bom->user_id = Auth::id();
                $bom->save();
            }
        }else{
            $bom = new Bom();
            $bom->status = 0;
            $bom->user_id = Auth::id();
            $bom->save();
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
            if ($request->has('project')) {
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
            if ($request->has('project')) {

                $project = DB::table('projects')->where('name', $request->project)->where('user_id', Auth::id())->first();
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
/*
 *
 *  uses for updating cart data
 */

    protected function updateCart($userOrder,$request,$bom)
    {

        if (isset($userOrder)) {

            $cartArray = unserialize($userOrder->name);
            for ($i = 0; $i < count($cartArray); $i++) {
                if ($cartArray[$i]['name'] == $request->keyword) {
                    session()->put(['check' => $i]);
                }
            }
            if (session()->has('check')) {
                $cartArray[session('check')]['num'] = $cartArray[session('check')]['num'] + $request->num;
                DB::table('carts')->where('bom_id', $bom->id)
                    ->update(['name' => serialize($cartArray)]);

            } else {
                array_push($cartArray, $this->cart[0]);
                DB::table('carts')->where('bom_id', $bom->id)
                    ->update(['name' => serialize($cartArray)]);

            }
        }
    }
    public function readCart(Request $request){
        try{

            $bom = Bom::where('user_id',Auth::id())->where('status',0)->firstOrFail();
        }catch (\Exception $exception){
            return '550';
        }
        if(!$bom->carts){
            $carts = $bom->carts;
        }else{
            return '550';
        }

        for($i=0 ; $i<count($carts) ;$i++){
           $orders[$i] = unserialize($carts[$i]->name);
            for($t=0 ; $t<count($orders[$i]);$t++){

                    $request['keyword'] = $orders[$i][$t]['name'];
                    $ctrl = new SearchController();
//                    /*
//                     *
//                     * TODO get_object_vars() --> cannot use object of type stdclass as array
//                     * if part could not be found
//                     */
                    if(gettype($ctrl->getPrice($request)) == 'integer'){
                        $orders[$i][$t]['price'] = 0;
                    }else{
                        $vars = get_object_vars($ctrl->getPrice($request));
                        $orders[$i][$t]['price'] =  $vars['unit_price'];
                    }
                    if($orders[$i][$t]['price'] == null){
                        $orders[$i][$t]['price'] = 0;
                    }

                }
            if($carts[$i]->project_id != 0 ){

                $projs[$i] = DB::table('projects')->where('id',$carts[$i]->project_id)->first()->name;
                $orders[$i]['project'] = $projs[$i];
            }else{
                $orders[$i]['project'] = null;
            }


        }
        return $orders;



    }
}
