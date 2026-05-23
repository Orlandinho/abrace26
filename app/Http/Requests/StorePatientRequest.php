<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StorePatientRequest extends FormRequest
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
            'slug' => $this->makeSlugFromName($this->name),
        ]);
    }

    protected function makeSlugFromName($name): string
    {
        $originalSlug = Str::slug($name);
        $slug = $originalSlug;
        $count = 1;

        while (Patient::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:patients',
            'dob' => 'required|date|date_format:Y-m-d|' . Rule::date()->beforeToday(),
            'allow_contact' => 'nullable|boolean',
            'contact' => 'nullable|string|max:10|regex:/\d{4,5}-\d{4}/',
            'specialties' => 'nullable|array|exists:specialties,id',
        ];
    }
}
