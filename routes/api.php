<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth:sanctum'])->group(function () {    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::put('/profile/{user}', [ProfileController::class, 'update']);

    Route::apiResource('users', UserController::class);

    Route::apiResource('articles', ArticleController::class);
});

require __DIR__.'/auth.php';
