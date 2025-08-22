<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campania extends Model
{
    protected $table = 'campanias';
    protected $primaryKey = 'id_campania';

    protected $fillable = [
        'campania',
        'fk_id_usuario',
        'fk_id_anio',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'fk_id_usuario', 'id_usuario');
    }

    public function anio()
    {
        return $this->belongsTo(Anio::class, 'fk_id_anio', 'id_anio');
    }

    public function sectores()
    {
        return $this->hasMany(Sector::class, 'fk_id_campania', 'id_campania');
    }
}

