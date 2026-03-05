<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpecialtyResource;
use App\Models\Specialty;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('specialties/index', [
            'specialties' => SpecialtyResource::collection(Specialty::all()->sortBy('name'))
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecialtyRequest $request)
    {
        $new_specialty = Specialty::create($request->validated());

        return redirect()
            ->route('specialties.index')
            ->alertSuccess("Especialidade {$new_specialty->name} cadastrada!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Specialty $specialty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpecialtyRequest $request, Specialty $specialty)
    {
        $specialty->update($request->validated());
        return redirect()
            ->route('specialties.index')
            ->alertSuccess("Especialidade {$specialty->name} atualizada!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialty $specialty)
    {
        $specialty->delete();
        return redirect()
            ->route('specialties.index')
            ->alertSuccess('Especialidade excluída!');
    }
}
