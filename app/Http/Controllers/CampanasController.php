<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use App\Models\Campania;
use App\Models\Sector;
use App\Models\Orden;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CampanasController extends Controller
{
    public function index(){
        $datos = Orden::select('totalOrdenes','fk_id_sector')->with(['sector:id_sector,sector,fk_id_campania','sector.campania:id_campania,campania,fk_id_anio','sector.campania.anio:id_anio,anio'])->get();
        return Inertia::render('Dashboard/Dashboard',['datos' => $datos]);
    }

}
