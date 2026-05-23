<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTriageRequest;
use App\Models\Patient;

class TriageController extends Controller
{
    public function __invoke(UpdateTriageRequest $request, Patient $patient)
    {
        $patient->update($request->validated());

        return redirect()->back()->alertSuccess("Dados de triagem do/a paciente {$patient->name} atualizados!");
    }
}
