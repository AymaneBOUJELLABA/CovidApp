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

//les routes pour la gestion des questions du formulaire
Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('questions', 'QuestionController@index');
        Route::get('question/{id}', 'QuestionController@show');
        Route::post('question/{id}', 'QuestionController@store');
        Route::put('question/{id}', 'QuestionController@update');
        Route::delete('question/{id}', 'QuestionController@delete');
    }
);

Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('infos', 'InfoController@index');
        Route::get('info/{id}', 'InfoController@show');
        Route::post('info/{id}', 'InfoController@store');
        Route::put('info/{id}', 'InfoController@update');
        Route::delete('info/{id}', 'InfoController@delete');
    }
);


//For the users ( customers)

//get the user I'm using to log in
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//get all the  users if I'm logged in
Route::middleware('auth:sanctum')->get('/users', function () {
    return User::all();
});
//delete the user
Route::middleware('auth:sanctum')->delete('user/delete/{id}', function ($id) {
    $user = User::findOrFail($id);
    $user->delete();
    return response('User deleted', 200);
});





//update the user
Route::middleware('auth:sanctum')->post('/user/update/{id}', function (Request $request, $id) {

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8'
    ]);
    $user = User::findOrFail($id);
    $data = $request->all();
    $user->name = $data['name'];
    $user->email = $data['email'];
    $user->password = Hash::make($data['password']);
    $user->save();
    return response('user Updated', 200);
});


//logout if I'm logged in
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->tokens()->delete();
    return response('Logged out', 200);
});


//register a new user

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'device_name' => 'required'
    ]);

    $user = User::create(
        [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]
    );

    $token = $user->createToken($request->device_name)->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token
    ];
    return response($response, 201);
});

//the login
Route::post('/login', function (Request $request) {
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
