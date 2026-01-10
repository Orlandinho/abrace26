<?php

use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use App\Models\User;
use Tests\TestCase;
uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->patient = Patient::factory()->create();
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

it('should return the patients create component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.create'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/create', true));
});

it('should return the patients show component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.show'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/show', true));
});

it('should return the patients edit component', function () {
    $this->actingAs($this->user)
        ->get(route('patients.edit'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia->component('patients/edit', true));
});
