<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return new UserResource($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        $validated = $request->safe();

        $user = new User();

        $user->fill([
            'name' => $validated->name,
            'email' => $validated->email,
            'password' => Hash::make($validated->password)
        ]);

        $user->save();

        return response([
            'message' => 'User created successfully',
            'data' => new UserResource($user)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $validated = $request->safe();

        $user->fill([
            'name' => $validated->name,
            'email' => $validated->email,
            'password' => Hash::make($validated->password)
        ]);

        $user->save();

        return response([
            'message' => 'User updated successfully',
            'data' => new UserResource($user)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        ($user->avatar !== null) ?? Storage::delete($user->avatar);

        $user->delete();

        return response([
            'message' => 'User deleted successfully'
        ]);
    }
}
