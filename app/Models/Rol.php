<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id_rol';

    protected $hidden = [
        'id_rol',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'nombre',
    ];

    public $timestamps = true;

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'id_rol', 'id_rol');
    }
}
