<?php

namespace Api\V1\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdatePhoto.
 *
 * @package Api\V1\Http\Requests
 */
class UpdatePhoto extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'description' => ['required', 'filled', 'string', 'min:1', 'max:65535'],
            'tags' => ['required', 'filled', 'array'],
            'tags.*.text' => ['required', 'filled', 'string', 'min:1', 'max:255'],
        ];
    }
}
