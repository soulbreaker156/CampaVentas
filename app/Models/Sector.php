<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    protected $table = 'sectores';
    protected $primaryKey = 'id_sector';

    protected $fillable = [
        'sector',
        'fk_id_campania',
    ];

    public function campania()
    {
        return $this->belongsTo(Campania::class, 'fk_id_campania', 'id_campania');
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'fk_id_sector', 'id_sector');
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'fk_id_sector', 'id_sector');
    }
}
