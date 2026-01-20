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
    $this->patients = Patient::factory()->count(15)->create();
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
        ->assertHasResource('patients', PatientResource::collection($this->patients->sortBy('name')));
});

it('load a patient in the show route', function () {
    $this->actingAs($this->user)
        ->get(route('patients.show', $this->patients->first()))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->has('patient'));
});

it('load a patient in the edit route', function () {
    $this->actingAs($this->user)
        ->get(route('patients.edit', $this->patients->first()))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->has('patient'));
});

it('should return the patients create component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.create'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/create', true));
});

it('should return the patients show component and load the patient info', function () {
    $this->actingAs($this->user)
        ->get(route('patients.show', $this->patients->first()))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->component('patients/show', true)
            ->hasResource('patient', PatientResource::make($this->patients->first()))
        );
});

it('should return the patients edit component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.edit', $this->patients->first()))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/edit', true));
});

it('should store a new patient', function () {
    $newPatient = [
        'name' => 'Antonio Orlando',
        'slug' => 'antonio-orlando',
        'email' => 'antonio_orlando@example.com.br',
        'dob' => '1990-01-01',
        'contact' => '(11) 99999-9999'
    ];
    $this->actingAs($this->user)
        ->post(route('patients.store'), $newPatient)
        ->assertRedirect(route('patients.index'));
    $this->assertDatabaseHas('patients', ['email' => $newPatient['email']]);
});

it('should update an existing patient', function () {
    $this->actingAs($this->user)
        ->patch(route('patients.update', $this->patients->first()), [
            'name' => 'Tony Stark',
            'slug' => $this->patients->first()->slug,
            'email' => $this->patients->first()->email,
            'dob' => '1975-10-25',
            'contact' => $this->patients->first()->contact
        ])
        ->assertRedirect(route('patients.index'));
    $this->assertDatabaseHas('patients', ['name' => 'Tony Stark']);
});

it('should delete an existing patient', function () {
    $this->actingAs($this->user)
        ->delete(route('patients.destroy', $this->patients->first()))
        ->assertRedirect(route('patients.index'));
    $this->assertDatabaseMissing('patients', ['id' => $this->patients->first()->id]);
});

it('should not allow to create a patient with missing required fields', function () {
    $this->actingAs($this->user)
        ->post(route('patients.store'), [])
        ->assertSessionHasErrors(['name','dob']);
});
