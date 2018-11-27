<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::post('/',function (){

});

Route::post('more-content/{category?}','PageController@moreContent');
Route::get('videos','PageController@Videos');
Route::get('more-videos','PageController@moreVideos');
Route::post('home/{category?}','PageController@home');
Route::get('excel-export','CartController@Excel_export');
Route::get('excel-import','CartController@Excel_import');

// ----------------------------- User Routes ----------------------------------------
//[

    Route::group(['prefix'=>'user'],function(){

        Route::post('register','UserController@register');
        Route::post('login','UserController@login');
        Route::post('data','UserController@userData');
        Route::get('login/google/callback',['uses'=>'UserController@handleProviderCallback']);
        Route::post('bom','CartController@getUserBom')->name('getUserBom');
        Route::post('bill','CartController@getUserBill')->name('getUserBill');

        Route::group(['prefix'=>'cart'],function (){

            Route::post('create','CartController@createCart');
            Route::post('read','CartController@readCart');
            Route::post('edit','CartController@editCart');
            Route::get('excel','CartController@Excel');

            Route::post('add','CartController@addToCart');
            Route::post('confirm','CartController@confirm');
            Route::post('price','CartController@price');


        });


        Route::group(['prefix'=>'project'],function (){

            Route::post('create','ProjectController@createProject');
            Route::post('read','ProjectController@readProject');
            Route::post('detail','ProjectController@detail');
            Route::post('delete','ProjectController@deleteProject');
        });

    });

//]
// --------------------------------- Content Manager Routes ------------------------------------
// [
    Route::group(['prefix'=>'cm'],function(){
        Route::post('login','CmController@login');
        Route::post('content/add','CmController@addContent');
        Route::post('content/edit','CmController@editContent');
        Route::post('content/get','CmController@getContent');
        Route::post('image/add','CmController@addImage')->name('addImage');
        Route::get('image/get','CmController@getImages');
        /**
         */
//        ->middleware('terminate')
        Route::get('login/google',['uses'=>'CmController@redirectToProvider'])->name('googleLogin');
        Route::get('login/google/callback',['uses'=>'CmController@handleProviderCallback']);


    });
// ]
// ----------------------------- Admin Routes ----------------------------------------
// [
    Route::group(['prefix'=>'admin'],function(){
        Route::post('cm/register','AdminController@registerCm');
        Route::post('register','AdminController@register');
        Route::post('cm/delete','AdminController@deleteCm')->middleware('terminate');
        Route::post('control-panel','AdminController@controlPanel');
        Route::post('login','AdminController@login');
});

// ]


// ---------------------------------------------------------------------
Route::get('add-slug','ProductController@addSlug');
Route::get('get-products','ProductController@all');

Route::post('logout','AuthController@logout')->name('logout');

// -------------------------------  Searching without filter  -----------------------------------
// [
    Route::get('search-part-comp','SearchController@SearchPartComp');
    Route::get('search-part','SearchController@SearchPart');
    Route::get('search-article','SearchController@findArticle');
    Route::post('sort-col','SearchController@sort');
    // -------------------------------  Getting price from shops  -----------------------------------
    Route::post('get-price','SearchController@getPrice');

// -------------------------------  Getting price from shops  -----------------------------------
    Route::post('get-quantity','SearchController@getQuantity');
    // -------------------------------  Searching with filter  -----------------------------------

    Route::get('search-part-filter','SearchController@filterPart');

//]
// -------------------------------  Site Viewers  -----------------------------------
Route::get('get-viewer','PageController@viewer');

// -------------------------------  Add/Read/Edit Parts Routes  -----------------------------------
//[

    Route::post('edit-part','ProductController@edit');

    Route::post('get-part-list','ProductController@getPartList');

// get all parts from a component type like Audio Special Purpose
    Route::post('get-part','ProductController@getPart');
//    Route::post('create/guest','CartController@cartWithoutToken');
//]
