import { CampaniaProps } from '@/components/interfaces/interfacesDatosTabla';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import DataTable from 'datatables.net-react';
import { useEffect, useState } from 'react';
import '../../../../css/tablastyle.css';

DataTable.use(DT);

interface TablaProps {
    datos: CampaniaProps[];
}

function Tabla({ datos }: TablaProps) {
    const [data, setData] = useState<(string | number | undefined)[][]>([]);
    //Cargara los datos que vienen de la bd
    useEffect(() => {
        if (datos && datos.length > 0) {
            const formatted = datos.map((d) => [
                d.sector.campania.campania,
                d.sector.sector,
                d.sector.campania.anio.anio,
                d.totalOrdenes ?? d.totalVentas ?? 'No hay datos',
            ]);
            setData(formatted);
        }
    }, [datos]);

    // Funciones para exportar
    const celdaCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const exportarEnCsv = (): void => {
        const BOM = '\uFEFF';
        //para Poner el nombre de la columna segun si viene de campañas o ventas
        const columnaTotales = datos[0].totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
        const csvContent =
            BOM +
            [
                `Campaña;Sector;Año;${columnaTotales}`,
                ...datos.map(
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
        link.setAttribute('download', datos[0].totalOrdenes !== undefined ? 'ReporteOrdenes.csv' : 'ReporteVentas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportarEnPDF = () => {
        const tituloReporte = datos[0].totalOrdenes !== undefined ? 'Reporte de Ordenes' : 'Reporte de Ventas';
        const tituloGeneral = datos[0].totalOrdenes !== undefined ? 'Lista de Ordenes' : 'Lista de Ventas';
        const tituloEncabezado = datos[0].totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
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
            th { background-color: #4facfe; color: white; }
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
              ${datos
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
        const tituloEncabezado = datos[0].totalOrdenes !== undefined ? 'Total de Ordenes' : 'Total de Ventas';
        const text =
            `Campaña\tSector\tAño\t${tituloEncabezado}\n` +
            datos
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
                alert('Error al copiar los datos');
            });
    };
    // Cambia el nombre de la columna segun si trae datos de ordenes o ventas;
    const cambioNombre = () => {
        if (datos[0].totalOrdenes !== undefined) {
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
