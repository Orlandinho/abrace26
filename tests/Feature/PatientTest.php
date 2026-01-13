<?php

use App\Http\Resources\PatientResource;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use App\Models\User;
use Tests\TestCase;
uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->patient = Patient::factory()->create();
    $this->patient_resource = PatientResource::make($this->patient);
});

it('should redirect to the login page if not authenticated', function () {
    $response = $this->get(route('patients.index'));
    $response->assertRedirect(route('login'));
});

it('should return the patients index component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.index'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/index', true));
});

it('load a list of patients in the index route', function () {
    $this->actingAs($this->user)
        ->get(route('patients.index'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->has('patients'));
});

it('load a patient in the show route', function () {
    $this->actingAs($this->user)
        ->get(route('patients.show', $this->patient))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->has('patient'));
});

it('load a patient in the edit route', function () {
    $this->actingAs($this->user)
        ->get(route('patients.edit', $this->patient_resource))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->has('patient'));
});

it('should return the patients create component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.create'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/create', true));
});

it('should return the patients show component and load the patient info', function () {
    $this->actingAs($this->user)
        ->get(route('patients.show', $this->patient))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->component('patients/show', true)
            ->where('patient', $this->patient)
        );
});

it('should return the patients edit component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.edit', $this->patient))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/edit', true));
});
