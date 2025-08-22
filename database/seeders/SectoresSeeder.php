<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sector;

class SectoresSeeder extends Seeder
{
    public function run()
    {
        Sector::create(['sector' => 'Zona Norte', 'fk_id_campania' => 1]);
        Sector::create(['sector' => 'Zona Sur', 'fk_id_campania' => 1]);
        Sector::create(['sector' => 'Zona Centro', 'fk_id_campania' => 2]);
    }
}