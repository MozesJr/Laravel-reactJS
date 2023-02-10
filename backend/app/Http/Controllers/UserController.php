<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $dataUser = User::select('id', 'name', 'email', 'level')->get();
        return $dataUser;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'level' => 'required'
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'level' => $request->level,
            ]);
            return response()->json([
                'message' => 'User created successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while creating user!!'
            ], 500);
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json([
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'level' => 'required'
        ]);

        try {
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'level' => $request->level,
            ];

            User::where('id', $id)->update($data);

            return response()->json([
                'message' => 'User Update successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while Update a user!!'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        try {
            $user->delete();
            return response()->json([
                'message' => 'User Deleted successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while Deleted a user!!'
            ], 500);
        }
        //
    }
}
