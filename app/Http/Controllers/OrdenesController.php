<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrdenesController extends Controller
{
    public function index()
    {
        $datos = Orden::select('totalOrdenes', 'fk_id_sector')->with(['sector:id_sector,sector,fk_id_campania', 'sector.campania:id_campania,campania,fk_id_anio', 'sector.campania.anio:id_anio,anio'])->get();
        return Inertia::render('Ordenes/Dashboard', ['datos' => $datos]);
    }
}
