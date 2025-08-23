import Swal from 'sweetalert2';
import { useForm,usePage} from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia';
import { useEffect } from 'react';
import {Link} from '@inertiajs/react';  


export default function Input() {
   const { flash } = usePage().props as { flash?:{message: string, icon:string }};
 
    const { data, setData, post,errors} = useForm({
      usuario: '',
      password: '',
    });
 
    function submit(e: React.FormEvent) {
      e.preventDefault();
      post('/login'); 
    }
   
   
    useEffect(() => {
      if (flash?.icon === 'success') {
        Swal.fire({
          title: flash?.message,
          text: flash?.message,
          icon: flash?.icon
        }).then(() => {
          Inertia.visit('/ordenes');
        });
      }else if(flash?.icon === 'error'){
        Swal.fire({
          title: flash?.message,
          text: flash?.message,
          icon: flash?.icon
        });
      }
    
    },[flash]);

      return (
          <div className="w-full max-w-xs">
            <form onSubmit={submit}>
              <div className="flex flex-col items-start">
                <label className="block text-white text-[25px] font-bold mb-2" htmlFor="username">
                  Usuario
                </label>
                <input value={data.usuario} onChange={(e) => setData('usuario',e.target.value)} className=" w-full p-3 rounded-[15px] bg-[#676762]/70 focus:outline-none text-white"></input>
                {errors.usuario && <span className="text-red-500 text-sm">{errors.usuario}</span>}
              </div>
              <div className="flex flex-col items-start">
                <label className="block text-white text-[25px] font-bold mb-2" htmlFor="contrasena">
                  Contraseña
                </label>
                <input type="password" value={data.password} onChange={(e) => setData('password',e.target.value)} className=" w-full p-3 rounded-[15px] bg-[#676762]/70 focus:outline-none text-white"></input>
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
              <div className="mt-4 w-full flex justify-center ">
                <button type="submit" className=" bg-black text-white text-[20px] w-[50%] p-2 h-[10%] rounded-2xl transition delay-100 duration-300 ease-in-out hover:bg-[#1A1A1A] hover:scale-110 hover:translate-y-0.5  drop-shadow-3xl">Iniciar Sesión</button>
              </div>
            </form>
          </div>
      );
 
}