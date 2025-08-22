<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Campania;

class CampaniasSeeder extends Seeder
{
    public function run()
    {
        Campania::create([
            'campania' => 'Campaña Verano',
            'fk_id_usuario' => 1,
            'fk_id_anio' => 2023 - 2022 + 1, // id de 2023 en el seeder de años
        ]);

        Campania::create([
            'campania' => 'Campaña Invierno',
            'fk_id_usuario' => 2,
            'fk_id_anio' => 2024 - 2022 + 1,
        ]);
    }
}
