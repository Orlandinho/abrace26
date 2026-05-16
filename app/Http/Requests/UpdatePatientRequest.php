<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdatePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => $this->name ? $this->makeSlugFromName($this->name) : $this->patient->slug,
            'allow_contact' => $this->allow_contact ?? $this->patient->allow_contact,
            'contact' => $this->contact ?? $this->patient->contact,
        ]);
    }

    protected function makeSlugFromName($name): string
    {
        $newSlug = Str::slug($name);

        // 1. Se o nome não mudou, retorna o slug que já está no banco
        if ($this->patient && $name === $this->patient->name) {
            return $this->patient->slug;
        }

        // 2. Se o nome mudou ou é novo, verifica se o novo slug colide com OUTROS registros
        $originalSlug = $newSlug;
        $count = 1;

        while (
        Patient::where('slug', $newSlug)
            ->when($this->patient, function ($query) {
                // Importante: Ignora o próprio paciente no update
                return $query->where('id', '!=', $this->patient->id);
            })
            ->exists()
        ) {
            $newSlug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $newSlug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|' . Rule::unique('patients')->ignore($this->patient->id),
            'dob' => 'sometimes|date|date_format:Y-m-d|' . Rule::date()->beforeToday(),
            'allow_contact' => 'nullable|boolean',
            'contact' => 'nullable|string|max:10|regex:/\d{4,5}-\d{4}/',
            'height' => 'nullable|string|max:4',
            'weight' => 'nullable|string|max:6',
            'pression' => 'nullable|string|max:6',
            'glicemia' => 'nullable|string|max:6',
            'temperature' => 'nullable|string|max:4',
            'breath' => 'nullable|string|max:2',
            'pulse' => 'nullable|string|max:3',
            'specialties' => 'nullable|array|exists:specialties,id',
        ];
    }
}
