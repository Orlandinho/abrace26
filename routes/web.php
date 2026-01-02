<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::controller(PatientController::class)->group(function () {
        Route::get('/pacientes', 'index')->name('patients.index');
        Route::get('/pacientes/criar', 'create' )->name('patients.create');
        Route::post('/pacientes', 'store')->name('patients.store');
        Route::get('/pacientes/{patient:slug}', 'show')->name('patients.show');
        Route::get('/pacientes/{patient:slug}/editar', 'edit')->name('patients.edit');
        Route::patch('/pacientes/{patient}', 'update')->name('patients.update');
        Route::delete('/pacientes/{patient}', 'destroy')->name('patients.destroy');
    });
});

require __DIR__.'/settings.php';
