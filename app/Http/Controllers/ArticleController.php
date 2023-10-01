<?php

namespace App\Http\Controllers;

use App\Http\Requests\Article\ArticleStoreRequest;
use App\Http\Requests\Article\ArticleUpdateRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::all();

        return new ArticleResource($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleStoreRequest $request)
    {
        $validated = $request->safe();

        $article = new Article();

        $imagePath = Storage::putFile('public/article/images', $validated->image);

        $article->fill([
            'user_id' => $request->user_id,
            'title' => $validated->title,
            'content' => $validated->content,
            'image' => $imagePath,
            'tags' => $validated->tags,
            'keywords' => $validated->keywords,
            'slug' => Str::slug($validated->title)
        ]);

        $article->save();

        return response([
            'message' => 'Article created successfully',
            'data' => new ArticleResource($article)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleUpdateRequest $request, Article $article)
    {
        $validated = $request->safe();

        $article->fill([
            'title' => $validated->title,
            'content' => $validated->content,
            'tags' => $validated->tags,
            'keywords' => $validated->keywords,
            'slug' => Str::slug($validated->title)
        ]);

        if ($validated->image !== null) {
            Storage::delete($article->image);

            $imagePath = Storage::putFile('public/article/images', $validated->image);

            $article->image = $imagePath;
        }

        $article->save();

        return response([
            'message' => 'Article updated successfully',
            'data' => new ArticleResource($article)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        Storage::delete($article->image);

        $article->delete();

        return response([
            'message' => 'Article deleted successfully'
        ]);
    }
}
