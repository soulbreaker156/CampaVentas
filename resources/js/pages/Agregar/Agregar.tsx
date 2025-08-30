import DashboardLayout from '@/layouts/DashboardLayout';
import { FormularioProps } from '@/components/interfaces/interfaceFormulario';
import FormularioAgregar from '@/components/ui/FormularioAgregar';
import { usePage } from '@inertiajs/react';


export default function Agregar() {
    const {sectores}= usePage<{sectores:FormularioProps[]}>().props;

    return (
        <DashboardLayout>
            <FormularioAgregar sectores={sectores}/>
        </DashboardLayout>
    );
}
