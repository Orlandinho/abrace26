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
            'nasc' => $this->dob->format('d/m/Y'),
            'age' => $this->dob->age > 1 ? $this->dob->age . ' anos' : $this->dob->age . ' ano',
            'contact' => $this->contact,
            'allow_contact' => $this->allow_contact,
            'height' => $this->height,
            'weight' => $this->weight,
            'pression' => $this->pression,
            'glicemia' => $this->glicemia,
            'temperature' => $this->temperature,
            'breath' => $this->breath,
            'pulse' => $this->pulse,
            'updated_at' => $this->updated_at,
            'specialties' => SpecialtyResource::collection($this->whenLoaded('specialties')),

        ];
    }
}
