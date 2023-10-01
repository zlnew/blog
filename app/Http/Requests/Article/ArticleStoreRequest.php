<?php

namespace App\Http\Requests\Article;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ArticleStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'string', Rule::exists(User::class)],
            'title' => ['required', 'string', 'max:128'],
            'image' => ['required', 'file', File::types('jpg', 'jpeg', 'png')->size(1024)],
            'content' => ['required', 'string'],
            'tags' => ['required', 'string'],
            'keywords' => ['required', 'string']
        ];
    }
}
