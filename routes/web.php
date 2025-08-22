<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CampanasController;
use App\Http\Middleware\VerificarAutenticacion;
use App\Http\Controllers\VentasController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::get('/sinAcceso',function(){
    return Inertia::render('Acceso/Acceso');
})->name('sin.acceso');

Route::middleware([VerificarAutenticacion::class])->group(function () {
Route::get('/campañas', [CampanasController::class, 'index'])->name('Dashboard');
Route::get('/ventas', [VentasController::class, 'index'])->name('Ventas');
});

Route::post('/logout',[LoginController::class,'logout']);
Route::post('/login', [LoginController::class, 'login']);
