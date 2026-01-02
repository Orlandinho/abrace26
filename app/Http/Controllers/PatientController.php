<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('patients/index', [
            'patients' => PatientResource::collection(Patient::orderBy('name')->get())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('patients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $new_patient = Patient::create($request->validated());

        return redirect()
            ->route('patients.index')
            ->alertSuccess("Paciente {$new_patient->name} cadastrado!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return inertia('patients/show', [
            'patient' => PatientResource::make($patient)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return inertia('patients/edit', [
            'patient' => PatientResource::make($patient)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());

        return redirect()
            ->route('patients.index')
            ->alertSuccess("Os dados do paciente {$patient->name} foram atualizados!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $deleted_patient = $patient->name;
        $patient->delete();
        return redirect()
            ->route('patients.index')
            ->alertSuccess("Os dados de {$deleted_patient} foram excluídos!");
    }
}
