<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'email' => $this->email,
            'dob' => $this->when($request->routeIs('patients.edit'), $this->dob->format('Y-m-d')),
            'age' => $this->dob->age > 1 ? $this->dob->age . ' anos' : $this->dob->age . ' ano',
            'contact' => $this->contact,
        ];
    }
}
