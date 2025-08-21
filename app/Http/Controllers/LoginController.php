<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use IntlChar;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $datos = Usuario::select('usuario','id_rol')->with('rol:id_rol,rol')->get();
        return Inertia::render('Dashboard/Dashboard',['datos' => $datos]);
    }

    public function registrar(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'usuario' => 'required|string|max:15|unique:usuarios,usuario',
            'password' => 'required|string|min:2',
            'id_rol' => 'required|exists:roles,id_rol', 
        ]);

        // Crear el nuevo usuario
        $usuario = Usuario::create([
            'usuario' => $validatedData['usuario'],
            'password' => Hash::make($validatedData['password']),
            'id_rol' => $validatedData['id_rol'],
        ]);

        // Retornar la respuesta
        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'usuario' => $usuario
        ], 201);
    }
    public function login(Request $request)
    {
         // Validar los datos que vienen del formulario
        $credentials = $request->validate([
            'usuario' => 'required|string|max:15',
            'password' => 'required|string|min:2',
        ],[
            'usuario.required' => 'El campo usuario es obligatorio',
            'usuario.max' => 'El usuario no puede tener más de 15 caracteres',
            'password.required' => 'El campo contraseña es obligatorio',
            'password.min' => 'La contraseña debe tener al menos 2 caracteres',
        ]);

        // Intentar autenticar usando Auth::attempt()
        if (Auth::attempt(['usuario'=> $credentials['usuario'], 'password' => $credentials['password']])) {
            // La autenticación fue exitosa
            return redirect()->route('home')->with('flash',[
                'icon'=> 'success','message' => 'login exitoso'
            ]);
        } else {
            // Falló la autenticación
            return redirect()->route('home')->with('flash',[
                'icon' => 'error','message' => 'No se puede inicar sesion'
            ]);
        }
    }
    public function logout(){
        Auth::logout();
        return redirect()->route('home');
    }
}