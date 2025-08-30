import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import Tabla from '@/components/ui/tabla';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Boton from '../ui/Boton';
import Lineas from '../ui/Lineas';

function UiDashboard({ datos }: { datos: CampaniaProps[] }) {
    // Estados para campañas y sectores
    const [campanas, setCampanas] = useState<string[]>([]);
    const [sectores, setSectores] = useState<string[]>([]);
    // Estados para los filtros seleccionados(vienen del componente Boton)
    const [filtroCampana, setFiltroCampana] = useState<string>('');
    const [filtroSector, setFiltroSector] = useState<string>('');

    // Extraer nombres de campañas y sectores únicos para las listas de selección(componente Boton)
    useEffect(() => {
        const nombresCampanas = datos.map((campana) => campana.sector.campania.campania);
        setCampanas(nombresCampanas);
        const nombresSectores = datos.map((sector) => sector.sector.sector);
        setSectores(nombresSectores);
    }, [datos]);
    return (
        <div className="flex flex-col items-center justify-center gap-4  w-[100%]">
            <section className=" flex sm:w-[60%] md:w-[80%] w-[20%] sm:justify-between justify-center gap-3 p-6">
                <Boton datos={campanas} filtro={setFiltroCampana} />
                <Boton datos={sectores} filtro={setFiltroSector} />
                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 pr-2 text-gray-700 hover:border-gray-500 hover:bg-gray-300"
                >
                    <Link href={'/agregar'} className='sm:text-[19px] text-[15px]'>Agregar Campaña</Link>
                </button>
            </section>
            <section className="sm:min-h-[40vh] sm:w-[95%] w-[100%] rounded-[10px] bg-purple-50 sm:p-5">
                <Tabla datos={datos} filtroCampana={filtroCampana} filtroSector={filtroSector} />
            </section>
            <section className="min-h-[40vh] w-[95%] rounded-[10px] bg-purple-50 p-5">
                <Lineas datos={datos} filtroCampana={filtroCampana} filtroSector={filtroSector} />
            </section>
        </div>
    );
}
export default UiDashboard;
