<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Anio;

class AniosSeeder extends Seeder
{
    public function run()
    {
        foreach (range(2022, 2025) as $anio) {
            Anio::create(['anio' => $anio]);
        }
    }
}