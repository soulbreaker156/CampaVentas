<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Orden;

class OrdenesSeeder extends Seeder
{
    public function run()
    {
        Orden::create(['totalOrdenes' => 10, 'fk_id_sector' => 1]);
        Orden::create(['totalOrdenes' => 20, 'fk_id_sector' => 2]);
        Orden::create(['totalOrdenes' => 15, 'fk_id_sector' => 3]);
    }
}