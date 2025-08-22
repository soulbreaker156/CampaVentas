<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolesSeeder extends Seeder
{
    public function run()
    {
        Rol::create(['rol' => 'Administrador']);
        Rol::create(['rol' => 'Supervisor']);
        Rol::create(['rol' => 'Vendedor']);
    }
}
