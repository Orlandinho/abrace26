<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Patient extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    protected $fillable = ['name', 'slug', 'dob', 'email', 'contact'];

    protected $casts = ['dob' => 'datetime'];
}
