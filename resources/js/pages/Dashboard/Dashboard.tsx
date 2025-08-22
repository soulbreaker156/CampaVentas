import Tabla from '@/components/ui/tabla';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';

interface AnioProps {
    id_anio: number;
    anio: number;
}
interface CampaniaP {
    id_campania: number;
    campania: string;
    anio: AnioProps;
}
interface Sector {
    id_sector: number;
    sector: string;
    campania: CampaniaP;
}
interface CampaniaProps {
    totalOrdenes?: number;
    totalVentas?: number;
    fk_id_sector: number;
    sector: Sector;
}

//recibe los datos de la bd como prop
function Dashboard() {
    const { datos } = usePage<{ datos: CampaniaProps[] }>().props;
    console.log(datos);
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center">
                    <section className="h-min-[10vh] flex h-[10vh] w-[60%] justify-between gap-3 p-6">
                        <button type="button" className="flex w-[30%] items-center justify-start rounded-[5px] bg-gray-300">
                            hola
                        </button>
                        <button type="button" className="flex w-[30%] items-center justify-start rounded-[5px] bg-gray-300">
                            adios
                        </button>
                    </section>
                    <section className="bg- h-min-[40vh] h-[50vh] w-[95%] rounded-[10px] bg-purple-50 p-5">
                        <Tabla datos={datos} />
                    </section>
                </div>
            </DashboardLayout>
        </>
    );
}
export default Dashboard;
