<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::get("memo/all","MemoController@index");
Route::post("memo/create","MemoController@store");
Route::post("memo/update/{id}","MemoController@update");
Route::get("memo/get/{id}","MemoController@edit");
Route::post("memo/changeFavorite/{id}","MemoController@updateFavorite");
Route::get("memo/getFavorites","MemoController@getFavorites");
Route::delete("memo/delete/{id}","MemoController@destroy");
