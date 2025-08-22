<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orden extends Model
{
    protected $table = 'ordenes';
    protected $primaryKey = 'id_orden';

    protected $fillable = [
        'totalOrdenes',
        'fk_id_sector',
    ];

    public function sector()
    {
        return $this->belongsTo(Sector::class, 'fk_id_sector', 'id_sector');
    }
}
