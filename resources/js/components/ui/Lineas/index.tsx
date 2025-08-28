import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import { LineChart, LineSeries } from '@mui/x-charts/LineChart';

export default function Lineas({ datos }: { datos: CampaniaProps[] }) {
    // Eje X: campañas únicas
    const datosCampania = Array.from(new Set(datos.map((item) => item.sector.campania.campania)));

    // Sectores únicos
    const sectores = Array.from(new Set(datos.map((item) => item.sector.sector)));

    // Series: cada sector tiene un array con los valores de todas las campañas
    const series: LineSeries[] = sectores.map((sector) => ({
        type: 'line',
        label: sector,
        data: datosCampania.map((campania) => {
            const encontrado = datos.find((item) => item.sector.sector === sector && item.sector.campania.campania === campania);
            return encontrado ? encontrado.totalOrdenes ?? encontrado.totalVentas : 0;
        })as (number | null)[],// Se utiliza por que la librera tienen un tipado muy estricto, con esto y el LineSeries[] se soluciona.
    }));

    return <LineChart height={400} series={series} xAxis={[{ scaleType: 'point', data: datosCampania }]} />;
}
