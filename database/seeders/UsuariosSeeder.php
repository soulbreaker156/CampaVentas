<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run()
    {
        Usuario::create([
            'usuario' => 'admin',
            'password' => Hash::make('admin123'),
            'id_rol' => 1,
            'imagen_de_perfil' => null,
        ]);

        Usuario::create([
            'usuario' => 'supervisor1',
            'password' => Hash::make('123456'),
            'id_rol' => 2,
            'imagen_de_perfil' => null,
        ]);

        Usuario::create([
            'usuario' => 'vendedor1',
            'password' => Hash::make('123456'),
            'id_rol' => 3,
            'imagen_de_perfil' => null,
        ]);
    }
}