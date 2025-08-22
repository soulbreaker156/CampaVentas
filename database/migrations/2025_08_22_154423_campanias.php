<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campanias', function (Blueprint $table) {
        $table->id('id_campania');
        $table->string('campania');
        $table->foreignId('fk_id_usuario')->constrained('usuarios', 'id_usuario')->onDelete('cascade');
        $table->foreignId('fk_id_anio')->constrained('anios', 'id_anio')->onDelete('cascade');
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
            Schema::dropIfExists('campanias');
    }
};
