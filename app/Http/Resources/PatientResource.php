<?php

namespace App\Http\Resources;

use App\Models\PatientSpecialty;
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
            'dob' => $this->dob->format('Y-m-d'),
            'age' => $this->dob->age > 1 ? $this->dob->age . ' anos' : $this->dob->age . ' ano',
            'contact' => $this->contact,
            'allow_contact' => $this->allow_contact,
            'specialties' => SpecialtyResource::collection($this->whenLoaded('specialties')),

        ];
    }
}
