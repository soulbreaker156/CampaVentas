import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import UiDashboard from '@/components/UiDashboards';
import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import { use } from 'react';
export default function Dashboard() {
    const {datos} = usePage<{ datos: CampaniaProps[] }>().props;
    return (
        <>
        <Head>
            <title>Ventas</title>
        </Head>
            <DashboardLayout>
                <UiDashboard datos={datos}/>
            </DashboardLayout>
        </>
    );
}
