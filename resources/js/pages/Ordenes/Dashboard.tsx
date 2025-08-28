import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import UiDashboard from '@/components/UiDashboards';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';

//recibe los datos de la bd como prop
function Dashboard() {
    const { datos } = usePage<{datos: CampaniaProps[];}>().props;

    return (
        <>
            <Head>
                <title>Campañas</title>
            </Head>
            <DashboardLayout>
                <UiDashboard datos={datos} />
            </DashboardLayout>
        </>
    );
}
export default Dashboard;
