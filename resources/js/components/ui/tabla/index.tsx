import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import { useEffect, useState } from 'react';
import '../../../../css/tablastyle.css';

DataTable.use(DT);

interface TablaProps {
    datos: CampaniaProps[];
    filtroCampana: string;
    filtroSector: string;
}

function Tabla({ datos, filtroCampana, filtroSector }: TablaProps) {
    // Filtrar según los filtros
    const datosFiltrados = datos.filter(
        (d) => (filtroCampana === '' || d.sector.campania.campania === filtroCampana) && (filtroSector === '' || d.sector.sector === filtroSector),
    );
    // Fallback si no hay datos con los filtros
    if (!datosFiltrados.length) {
        return (
            <div className="flex h-[100%] w-[100%] items-center justify-center rounded-xl bg-white p-[20%] text-black shadow-md">
                <p>No se encontraron resultados para los filtros seleccionados.</p>
            </div>
        );
    }
    // Estado para los datosFiltrados formateados para la tabla
    const [data, setData] = useState<(string | number | undefined)[][]>([]);

    //Cargara los datosFiltrados formateados para la tabla
    useEffect(() => {
        if (datosFiltrados && datosFiltrados.length > 0) {
            const formatted = datosFiltrados.map((d) => [
                d.sector.campania.campania,
                d.sector.sector,
                d.sector.campania.anio.anio,
                d.totalOrdenes ?? d.totalVentas ?? 'No hay datos',
            ]);
            setData(formatted);
        }
    }, [datos, filtroCampana, filtroSector]);

    // Funciones para exportar
    const celdaCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const exportarEnCsv = (): void => {
        if (datosFiltrados.length === 0) return;
        const BOM = '\uFEFF';
        //para Poner el nombre de la columna segun si viene de campañas o ventas
        const columnaTotales = datosFiltrados[0]?.totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
        const csvContent =
            BOM +
            [
                `Campaña;Sector;Año;${columnaTotales}`,
                ...datosFiltrados.map(
                    (d) =>
                        `${celdaCSV(d.sector.campania.campania)};` +
                        `${celdaCSV(d.sector.sector)};` +
                        `${celdaCSV(d.sector.campania.anio.anio.toString())};` +
                        `${celdaCSV(d.totalOrdenes?.toString() ?? d.totalVentas?.toString() ?? 'No hay datos')}`,
                ),
            ].join('\r\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', datosFiltrados[0]?.totalOrdenes !== undefined ? 'ReporteOrdenes.csv' : 'ReporteVentas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportarEnPDF = () => {
        if (datosFiltrados.length === 0) return;
        const tituloReporte = datosFiltrados[0]?.totalOrdenes !== undefined ? 'Reporte de Ordenes' : 'Reporte de Ventas';
        const tituloGeneral = datosFiltrados[0]?.totalOrdenes !== undefined ? 'Lista de Ordenes' : 'Lista de Ventas';
        const tituloEncabezado = datosFiltrados[0]?.totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
        const printWindow = window.open('');
        if (printWindow) {
            const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${tituloReporte}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #4facfe; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #4facfe; color: black; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${tituloGeneral}</h1>
          <p>Generado el: ${new Date().toLocaleDateString('es-ES')}</p>
          <table>
            <thead>
              <tr>
                <th>Campaña</th>
                <th>Sector</th>
                <th>Año</th>
                <th>${tituloEncabezado}</th>
              </tr>
            </thead>
            <tbody>
              ${datosFiltrados
                  .map(
                      (d) => `
                <tr>
                  <td>${d.sector.campania.campania}</td>
                  <td>${d.sector.sector}</td>
                  <td>${d.sector.campania.anio.anio}</td>
                  <td>${d.totalOrdenes ?? d.totalVentas ?? 'No hay datos'}</td>
                </tr>
              `,
                  )
                  .join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const imprimir = () => {
        exportarEnPDF();
    };

    const copiarAlPortaPapeles = () => {
        if (datosFiltrados?.length === 0) return;
        const tituloEncabezado = datosFiltrados[0]?.totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
        const text =
            `Campaña\tSector\tAño\t${tituloEncabezado}\n` +
            datosFiltrados
                .map(
                    (d) =>
                        `${d.sector.campania.campania}\t${d.sector.sector}\t${d.sector.campania.anio.anio}\t${d.totalOrdenes ?? d.totalVentas ?? 'No hay datos'}`,
                )
                .join('\n');

        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert('Datos copiados al portapapeles');
            })
            .catch(() => {
                alert('Error al copiar los datosFiltrados');
            });
    };
    // Cambia el nombre de la columna segun si trae datosFiltrados de ordenes o ventas;
    const cambioNombre = () => {
        if (datosFiltrados[0]?.totalOrdenes !== undefined) {
            return <th>Total de Ordenes</th>;
        } else {
            return <th>Total de Ventas</th>;
        }
    };

    return (
        <div className="h-[100%] w-[100%] rounded-xl bg-white p-4 text-black shadow-md">
            {/*Botones de exportación*/}
            <div className="export-buttons mb-4">
                <button onClick={exportarEnCsv} className="export-btn excel-btn">
                    📊 Excel
                </button>
                <button onClick={exportarEnPDF} className="export-btn pdf-btn">
                    📄 PDF
                </button>
                <button onClick={imprimir} className="export-btn print-btn">
                    🖨️ Imprimir
                </button>
                <button onClick={copiarAlPortaPapeles} className="export-btn copy-btn">
                    📋 Copiar
                </button>
            </div>

            <DataTable
                data={data}
                className="display h-[90%]"
                options={{
                    paging: true,
                    searching: true,
                    responsive: true,
                    ordering: true,
                    pageLength: 10,
                    lengthMenu: [
                        [50, 25, 25, 10],
                        [50, 25, 25, 10],
                        [50, 25, 25, 10],
                        [50, 25, 25, 10],
                    ],
                }}
            >
                <thead>
                    <tr>
                        <th>Campaña</th>
                        <th>Sector</th>
                        <th>Año</th>
                        {cambioNombre()}
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}

export default Tabla;
