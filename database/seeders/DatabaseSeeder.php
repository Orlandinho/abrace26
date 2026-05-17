<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        //$2y$12$.LsTws7XwlQQWTUrYejY0.Ra9bV94PF2GF3FMX2IUixhpeGOXowZm

        User::firstOrCreate(
            ['email' => 'antonio_orlando@example.com.br'],
            [
                'name' => 'Antonio Orlando',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
    }
}
