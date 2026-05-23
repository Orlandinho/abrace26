<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTriageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'height' => 'nullable|string|max:4',
            'weight' => 'nullable|string|max:6',
            'pression' => 'nullable|string|max:6',
            'glicemia' => 'nullable|string|max:6',
            'temperature' => 'nullable|string|max:4',
            'breath' => 'nullable|string|max:2',
            'pulse' => 'nullable|string|max:3',
        ];
    }
}
