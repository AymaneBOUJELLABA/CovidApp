<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

Route::get('comments', 'CommentController@index');
Route::get('comment/{id}', 'CommentController@show');
Route::post('comment', 'CommentController@store');
Route::put('comment/{id}', 'CommentController@update');
Route::delete('comment/{id}', 'CommentController@delete');

Route::middleware('auth:sanctum')->group(
    function ()
    {
        Route::get('questions', 'QuestionController@index');
        Route::get('question/{id}', 'QuestionController@show');
        Route::post('question/{id}', 'QuestionController@store');
        Route::put('question/{id}', 'QuestionController@update');
        Route::delete('question/{id}', 'QuestionController@delete');
    }
);


//For the users ( customers)
Route::middleware('auth:sanctum')->get('/user', function (Request $request)
{
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/logout', function (Request $request)
{
    $request->user()->tokens()->delete();
    return response('Logged out', 200);
});

Route::post('/login', function (Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect!.'],
        ]);
    }

    $token = $user->createToken($request->device_name)->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token
    ];
    return response($response, 201);
});
