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

Route::post('more-content','PageController@moreContent');
Route::post('home/{category?}','PageController@home');
// ----------------------------- Authentication Routes ----------------------------------------
//[
    Route::post('user-register','AuthController@register');
    Route::post('login','AuthController@login');
    Route::get('login/google',['uses'=>'AuthController@redirectToProvider'])->name('googleLogin');
    Route::get('login/google/callback',['uses'=>'AuthController@handleProviderCallback']);
    Route::post('logout','AuthController@logout')->name('logout');
//]
// --------------------------------- Content Manager Routes ------------------------------------
// [
    Route::post('cm-add-content','CmController@addContent')->middleware('terminate','cm');
    Route::post('cm-add-image','CmController@addImage')->middleware('terminate','cm')->name('addImage');
    Route::get('get-images','CmController@getImages')->middleware('terminate','cm');
    Route::post('cm-edit-content','CmController@editContent')->middleware('terminate','cm');
    Route::post('get-content','CmController@getContent');
// ]
// ----------------------------- Admin Routes ----------------------------------------
// [
    Route::post('admin-register-cm','AuthController@register')->middleware('terminate','admin');
    Route::post('admin-register','AuthController@register');
    Route::post('admin-delete-cm','CmController@deleteCm')->middleware('terminate','admin');
    Route::post('admin-control-panel','PageController@controlPanel')->middleware('admin','terminate');
// ]
// ---------------------------------------------------------------------
Route::get('add-slug','ProductController@addSlug');
Route::get('get-products','ProductController@all');

// -------------------------------  Searching without filter  -----------------------------------
// [
    Route::get('search-part-comp','SearchController@SearchPartComp');
    Route::get('search-part','SearchController@SearchPart');
    Route::get('search-article','SearchController@findArticle');
    Route::post('sort-col','SearchController@sort');
    // -------------------------------  Searching with filter  -----------------------------------

    Route::post('search-part-filter','SearchController@filterPart');

//]
// -------------------------------  Site Viewers  -----------------------------------
Route::get('get-viewer','PageController@viewer');

// -------------------------------  Add/Read/Edit Parts Routes  -----------------------------------
//[

    Route::post('edit-part','ProductController@edit');

    Route::post('get-part-list','ProductController@getPartList');

// get all parts from a component type like Audio Special Purpose
    Route::post('get-part','ProductController@getPart');

//]