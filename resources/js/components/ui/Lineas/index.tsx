import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import { LineChart, LineSeries } from '@mui/x-charts/LineChart';
interface LineasProps {
    datos: CampaniaProps[];
    filtroCampana: string;
    filtroSector: string;
}

export default function Lineas({ datos,filtroCampana,filtroSector }: LineasProps) {
   
     // Filtrar según los filtros
    const datosFiltrados = datos.filter(
        (d) => (filtroCampana === '' || d.sector.campania.campania === filtroCampana) && (filtroSector === '' || d.sector.sector === filtroSector),
    );
    // Datos totales para el eje Y (ya sea de órdenes o ventas)
    const totales = datos.length > 0 && datos[0].totalOrdenes !== undefined ? datos.map((d) => d.totalOrdenes ) : datos.map((d) => d.totalVentas );
    // Eje X: campañas únicas
    const datosCampania = Array.from(new Set(datos.map((item) => item.sector.campania.campania)));

    // Sectores únicos
    const sectores = Array.from(new Set(datosFiltrados.map((item) => item.sector.sector)));

    // Series: cada sector tiene un array con los valores de todas las campañas
    const series: LineSeries[] = sectores.map((sector) => ({
        type: 'line',
        label: sector,
        data: datosCampania.map((campania) => {
            const encontrado = datosFiltrados.find((item) => item.sector.sector === sector && item.sector.campania.campania === campania);
            return encontrado ? encontrado.totalOrdenes ?? encontrado.totalVentas : 0;
        })as (number | null)[],// Se utiliza por que la librera tienen un tipado muy estricto, con esto y el LineSeries[] se soluciona.
    }));

    return <LineChart height={400} series={series} xAxis={[{ scaleType: 'point', data: datosCampania }]} yAxis={[{data:totales, width:50}]} />;
}
