import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
function Navegacion() {

 
    function cerrarSesion() {
        Swal.fire({
            title: "Cerrar Sesión",
            text: "Estas seguro de cerrar sesión",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Cerrar",
            cancelButtonText: "Regresar"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
                Inertia.post('/logout');
            }
            });


    }
    return (
        <div className="flex items-center  w-full justify-between bg-[#E5004B] p-5 text-white">
            <div className=" flex items-center justify-center sm:h-[9vh] h-[6vh] sm:w-[9vh] w-[6vh] bg-gray-400 rounded-b-full rounded-t-full overflow-hidden">
                <img className="h-full" src="/images/avatar.jpg" alt="Avatar" />
            </div>
           
            <div>
                <ul className=" h-[9vh] flex gap-3 text-[25px] items-center">
                    <li><Link href="/ordenes">Ordenes</Link></li>
                    <li><Link href="/ventas">Ventas</Link></li>
                    <li><button onClick={cerrarSesion} className=" cursor-pointer">Cerrar Sesión</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Navegacion;