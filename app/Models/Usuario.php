<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Authenticatable
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at'
    ];

    protected $fillable = [
        'usuario',
        'fk_id_rol',
        'password',
        'imagen_de_perfil',
    ];

    public $timestamps = true;


    public function rol()
    {
        return $this->belongsTo(Rol::class, 'id_rol', 'id_rol');
    }
    public function campanias()
    {
        return $this->hasMany(Campania::class, 'fk_id_usuario', 'id_usuario');
    }

}
