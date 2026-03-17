<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Specialty extends Model
{
    /** @use HasFactory<\Database\Factories\SpecialtyFactory> */
    use HasFactory;

    protected $fillable = ['name', 'limit'];

    public function patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class)->withPivot('id', 'status');
    }
}
