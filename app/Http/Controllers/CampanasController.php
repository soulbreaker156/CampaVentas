<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CampanasController extends Controller
{
    public function index(){
        $datos = Usuario::select('usuario','id_rol')->with('rol:id_rol,rol')->get();
        return Inertia::render('Dashboard/Dashboard',['datos' => $datos]);
    }

}
