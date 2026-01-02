<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Patient extends Model
{
    protected $fillable = ['name', 'slug', 'dob', 'email', 'contact'];

    protected $casts = ['dob' => 'datetime'];
}
