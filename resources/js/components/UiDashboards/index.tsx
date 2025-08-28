import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import Tabla from '@/components/ui/tabla';
import Lineas from '../ui/Lineas';

function UiDashboard({ datos }: { datos: CampaniaProps[] }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <section className="h-min-[10vh] flex h-[10vh] w-[60%] justify-between gap-3 p-6">
                <button type="button" className="flex w-[30%] items-center justify-start rounded-[5px] bg-gray-300">
                    hola
                </button>
                <button type="button" className="flex w-[30%] items-center justify-start rounded-[5px] bg-gray-300">
                    adios
                </button>
            </section>
            <section className="bg- h-min-[40vh] h-[50%] w-[95%] rounded-[10px] bg-purple-50 p-5">
                <Tabla datos={datos} />
            </section>
            <section className="bg- h-min-[40vh] h-[80%] w-[95%] rounded-[10px] bg-purple-50 p-5">
                <Lineas datos={datos} />
            </section>
        </div>
    );
}
export default UiDashboard;
