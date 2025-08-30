<?php

namespace App\Http\Controllers;

use App\Models\Campania;
use App\Models\Sector;
use App\Models\Orden;
use App\Models\Venta;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CampaniaController extends Controller
{
    function index()
    {
        $sectores = Sector::select('id_sector', 'sector')->get();
        return Inertia::render('Agregar/Agregar', ['sectores' => $sectores]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nombrecampana' => 'required|string|max:255',
                'sector' => 'required|array|min:1',
                'sector.*.sector' => 'required|string|max:255',
                'sector.*.ordenes' => 'required|numeric',
                'sector.*.ventas' => 'required|numeric',
            ]);

            $campania=Campania::create([
                'campania' => $request->nombrecampana,
                'fk_id_usuario' => Auth::user()->id_usuario,
                'fk_id_anio' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            
            // Guardar cada sector del array
            foreach ($request->sector as $sectorData) {
                //Crear el sector primero con el id de de la campaña recien creada
                $sector = Sector::create([
                    'sector' => $sectorData['sector'],
                    'fk_id_campania' => $campania -> id_campania,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                //Usar el ID del sector recién creado para crear ordenes
                Orden::create([
                    'totalOrdenes' => $sectorData['ordenes'],
                    'fk_id_sector' => $sector->id_sector, 
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                //Usar el ID del sector recién creado para crear venta
                Venta::create([
                    'totalVentas' => $sectorData['ventas'],
                    'fk_id_sector' => $sector->id_sector,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return redirect()->route('Agregar')->with('success', 'Campaña creada exitosamente.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la campaña: ' . $e->getMessage());
        }
    }
}
