import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import { useEffect, useState } from 'react';
import Tabla from '@/components/ui/tabla';
import Boton from '../ui/Boton';
import Lineas from '../ui/Lineas';

function UiDashboard({ datos }: { datos: CampaniaProps[] }) {
    const [campanas, setCampanas] = useState<string[]>([]);
    const[ sectores, setSectores] = useState<string[]>([]);
    const[filtroCampana, setFiltroCampana] = useState<string>('');
    const[filtroSector, setFiltroSector] = useState<string>('');
    

    useEffect(() => {
        const nombresCampanas = datos.map((campana) => campana.sector.campania.campania);
        setCampanas(nombresCampanas);
        const nombresSectores = datos.map((sector) => sector.sector.sector);
        setSectores(nombresSectores);
    }, [datos]);
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <section className="h-min-[10vh] flex h-[10vh] w-[60%] justify-between gap-3 p-6">
                <Boton datos={campanas} filtro={setFiltroCampana}/>
                <Boton datos={sectores} filtro={setFiltroSector}/>
            </section>
            <section className="bg- h-min-[40vh] h-[50%] w-[95%] rounded-[10px] bg-purple-50 p-5">
                <Tabla datos={datos} filtroCampana={filtroCampana} filtroSector={filtroSector}/>
            </section>
            <section className="bg- h-min-[40vh] h-[80%] w-[95%] rounded-[10px] bg-purple-50 p-5">
                <Lineas datos={datos} />
            </section>
        </div>
    );
}
export default UiDashboard;
