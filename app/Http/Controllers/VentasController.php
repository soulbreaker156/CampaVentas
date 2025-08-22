<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Venta;
class VentasController extends Controller
{
    function index(){
        $datos = Venta::select('totalVentas', 'fk_id_sector')->with(['sector:id_sector,sector,fk_id_campania', 'sector.campania:id_campania,campania,fk_id_anio', 'sector.campania.anio:id_anio,anio'])->get();
        return Inertia::render('Ventas/Dashboard', ['datos' => $datos]);
    }
}
