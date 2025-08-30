<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrdenesController;
use App\Http\Middleware\VerificarAutenticacion;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\CampaniaController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::get('/sinAcceso',function(){
    return Inertia::render('Acceso/Acceso');
})->name('sin.acceso');

Route::middleware([VerificarAutenticacion::class])->group(function () {
Route::get('/ordenes', [OrdenesController::class, 'index'])->name('Ordenes');
Route::get('/ventas', [VentasController::class, 'index'])->name('Ventas');
Route::get('/agregar', [CampaniaController::class, 'index'])->name('Agregar');
Route::post('/guardarCampaña', [CampaniaController::class, 'store'])->name('guardar.ordenes');
});

Route::post('/logout',[LoginController::class,'logout']);
Route::post('/login', [LoginController::class, 'login']);
