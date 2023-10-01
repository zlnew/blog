<?php

namespace App\Http\Controllers;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, User $user)
    {
        $validated = $request->safe();

        $user->fill([
            'name' => $validated->name,
            'email' => $validated->email
        ]);

        if ($validated->avatar !== null) {
            $avatarPath = Storage::putFile('public/avatar', $validated->avatar);
            $user->avatar = $avatarPath;
        }

        ($user->isDirty('email')) ?? $user->email_verified_at = null;

        $user->save();

        return response([
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
}
