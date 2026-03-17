<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientSpecialtyResource;
use App\Models\PatientSpecialty;

class PatientSpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('appointments/index', [
            'appointments' => PatientSpecialtyResource::collection(PatientSpecialty::with(['patient', 'specialty'])->get())
        ]);
    }

    /**
     * Edit the specified resource in storage.
     */
    public function update(PatientSpecialty $appointment)
    {
        $newStatus = match ($appointment->status) {
            0 => 1,
            1 => 2,
            2 => 0,
            default => null
        };

        if ($newStatus !== null) {
            $appointment->update(['status' => $newStatus]);
        }

        return back()->alertSuccess('Status da consulta atualizado!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PatientSpecialty $appointment)
    {
        $appointment->delete();

        return back()->alertSuccess('Consulta deletada!');
    }
}
