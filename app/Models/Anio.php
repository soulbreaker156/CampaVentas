<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anio extends Model
{
    protected $table = 'anios';
    protected $primaryKey = 'id_anio';

    protected $fillable = [
        'anio',
    ];

    public function campanias()
    {
        return $this->hasMany(Campania::class, 'fk_id_anio', 'id_anio');
    }
}
