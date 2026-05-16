<?php

namespace App\Http\Controllers;

use App\Events\NewAppointment;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\PatientResource;
use App\Http\Resources\PatientSpecialtyResource;
use App\Http\Resources\SpecialtyResource;
use App\Models\Patient;
use App\Models\PatientSpecialty;
use App\Models\Specialty;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('patients/index', [
            'patients' => PatientResource::collection(Patient::with('specialties')->orderBy('name')->get()),
            'specialties' => SpecialtyResource::collection(Specialty::withCount('patients')->orderBy('name')->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Throwable
     */
    public function store(StorePatientRequest $request)
    {
        DB::transaction( function () use ($request) {
            $patient = Patient::create($request->safe()->except('specialties'));
            if ($request->specialties) {
                $patient->specialties()->attach($request->specialties);
            }
        });

        //broadcast(new NewAppointment('Novas consultas cadastradas'));

        return redirect()
            ->back()
            ->alertSuccess("Paciente {$request->name} cadastrado!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return inertia('patients/show', [
            'patient' => PatientResource::make($patient),
            'appointments' => PatientSpecialtyResource::collection(PatientSpecialty::with(['specialty','patient'])->where('patient_id', $patient->id)->get()),
        ]);
    }

    /**
     * Edit the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        DB::transaction( function () use ($request, $patient) {
            $patient->update($request->safe()->except('specialties'));
            $patient->specialties()->sync($request->specialties);
        });

        return redirect()
            ->back()
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
            ->back()
            ->alertSuccess("Os dados de {$deleted_patient} foram excluídos!");
    }
}
