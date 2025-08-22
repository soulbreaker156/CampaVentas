<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = 'ventas';
    protected $primaryKey = 'id_venta';

    protected $fillable = [
        'totalVentas',
        'fk_id_sector',
    ];

    public function sector()
    {
        return $this->belongsTo(Sector::class, 'fk_id_sector', 'id_sector');
    }
}

