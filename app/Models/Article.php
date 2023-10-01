<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'articles';

    protected $primaryKey = 'article_id';

    protected $with = 'user';

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image',
        'tags',
        'keywords',
        'slug'
    ];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Storage::link($value),
        );
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'id');
    }
}
