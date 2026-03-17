<?php

use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientSpecialtyController;
use App\Http\Controllers\SpecialtyController;
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
        Route::post('/pacientes', 'store')->name('patients.store');
        Route::get('/pacientes/{patient:slug}', 'show')->name('patients.show');
        Route::patch('/pacientes/{patient}', 'update')->name('patients.update');
        Route::delete('/pacientes/{patient}', 'destroy')->name('patients.destroy');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::controller(SpecialtyController::class)->group(function () {
        Route::get('/especialidades', 'index')->name('specialties.index');
        Route::post('/especialidades', 'store')->name('specialties.store');
        Route::patch('/especialidades/{specialty}', 'update')->name('specialties.update');
        Route::delete('/especialidades/{specialty}', 'destroy')->name('specialties.destroy');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::controller(PatientSpecialtyController::class)->group(function () {
        Route::get('/consultas', 'index')->name('appointments.index');
        Route::patch('/consultas/{appointment}', 'update')->name('appointments.update');
        Route::delete('/consultas/{appointment}', 'destroy')->name('appointments.destroy');
    });
});

require __DIR__.'/settings.php';
