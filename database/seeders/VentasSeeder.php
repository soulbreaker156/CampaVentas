<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Venta;

class VentasSeeder extends Seeder
{
    public function run()
    {
        Venta::create(['totalVentas' => 5000, 'fk_id_sector' => 1]);
        Venta::create(['totalVentas' => 7500, 'fk_id_sector' => 2]);
        Venta::create(['totalVentas' => 6200, 'fk_id_sector' => 3]);
    }
}