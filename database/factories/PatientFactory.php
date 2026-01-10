<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PatientFactory extends Factory
{
    protected $model = Patient::class;

    public function definition(): array
    {
        $name = fake()->FirstName() . ' ' . fake()->LastName();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'dob' => fake()->dateTimeBetween('-70 years', '-1 year')->format('Y-m-d'),
            'email' => Str::slug($name, '_') . '@example.com',
            'contact' => fake()->phoneNumber(),
        ];
    }
}
