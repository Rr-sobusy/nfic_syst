<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FgController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\SelectController;
use App\Http\Controllers\InsertController;




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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Get API

Route::get('warehouse/getFg', [SelectController::class, 'getFg'])->middleware('cos');
Route::get('warehouse/getMicros', [SelectController::class, 'getMicro']);
Route::get('warehouse/getMacros',[SelectController::class, 'getMacro']);
Route::get('/warehouse/FG', [FgController::class, 'index']);

// Post API

Route::post('warehouse/insertFg', [InsertController::class, 'insertNewFg']);
Route::post('warehouse/updatemacro', [UpdateController::class, 'addPendingMacro']);
Route::post('warehouse/updatemicro', [UpdateController::class, 'addPendingMicro']);
Route::post('warehouse/insertMicro', [InsertController::class, 'insertNewMicro']);
Route::post('warehouse/insertMacro', [InsertController::class, 'insertNewMacro']);

