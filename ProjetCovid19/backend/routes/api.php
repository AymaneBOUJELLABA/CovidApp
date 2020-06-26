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

Route::get('comments' , 'CommentController@index');
Route::get('comment/{id}' , 'CommentController@show');
Route::post('comment' , 'CommentController@store');
Route::put('comment/{id}' , 'CommentController@update');
Route::delete('comment/{id}' , 'CommentController@delete');




