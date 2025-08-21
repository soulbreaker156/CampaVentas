<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\VerificarAutenticacion;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login/Login');
})->name('home');

Route::get('/sinAcceso',function(){
    return Inertia::render('Acceso/Acceso');
})->name('sin.acceso');

Route::middleware([VerificarAutenticacion::class])->group(function () {
Route::get('/dashboard', [LoginController::class, 'index'])->name('Dashboard');
});

Route::post('/logout',[LoginController::class,'logout']);
Route::post('/login', [LoginController::class, 'login']);
