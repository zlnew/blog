<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class ArticleUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:128'],
            'image' => ['nullable', 'file', File::types('jpg', 'jpeg', 'png')->size(1024)],
            'content' => ['required', 'string'],
            'tags' => ['required', 'string'],
            'keywords' => ['required', 'string']
        ];
    }
}
