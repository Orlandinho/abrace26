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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->date('dob');
            $table->string('contact')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->string('pression')->nullable();
            $table->string('glicemia')->nullable();
            $table->string('temperature')->nullable();
            $table->string('breath')->nullable();
            $table->string('pulse')->nullable();
            $table->boolean('allow_contact')->nullable()->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
