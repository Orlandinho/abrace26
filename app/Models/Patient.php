<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Patient extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    protected $fillable = ['name', 'slug', 'dob', 'allow_contact', 'contact'];

    protected $casts = ['dob' => 'datetime'];

    public function specialties(): BelongsToMany
    {
        return $this->belongsToMany(Specialty::class)->withPivot('id', 'status')->wherePivot('status', '!==', 2);
    }
}
