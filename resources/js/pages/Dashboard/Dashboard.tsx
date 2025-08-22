import DashboardLayout from "@/layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";
import Tabla from "@/components/ui/tabla";

interface AnioProps {
    id_anio: number;
    anio: number;
}
interface CampaniaP{
    id_campania: number;
    campania: string;
    anio:AnioProps
}
interface Sector{
    id_sector:number;
    sector:string;
    campania: CampaniaP;
}
interface CampaniaProps{
    totalOrdenes:number;
    fk_id_sector:number;
    sector:Sector;
}


//recibe los datos de la bd como prop
function Dashboard() {
    const {datos} = usePage<{datos: CampaniaProps[]}>().props;
    console.log(datos);
    return (
        <>
        <Head>
                <title>Dashboard</title>
        </Head>
        <DashboardLayout>    
           <div className=" flex justify-center items-center gap-3">
                <div className="w-[150vh] h-[80vh] h-min-[80vh] p-4 bg-white my-5 rounded-2xl shadow-[50px_15px_20px_rgba(0,0,0,0.25)]">
                    <div className="flex flex-col justify-center items-center">
                        <section className=" flex gap-3 justify-between w-[60%] h-[10vh] h-min-[10vh] p-6">
                                <button type="button" className="flex justify-start items-center w-[30%] bg-gray-300 rounded-[5px]">hola</button>
                                <button type="button" className="flex justify-start items-center w-[30%] bg-gray-300 rounded-[5px]">adios</button>
                        </section>
                        <section className="w-[95%] bg- h-[50vh] h-min-[40vh] bg-purple-50 p-5 text-black rounded-[10px]">
                            <Tabla datos={datos} />
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
        </>
    );
}
export default Dashboard;