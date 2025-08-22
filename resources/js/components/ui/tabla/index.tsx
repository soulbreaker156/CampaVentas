import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import DataTable from 'datatables.net-react';
import { useEffect, useState } from 'react';
import '../../../../css/tablastyle.css';

DataTable.use(DT);

interface AnioProps {
    id_anio: number;
    anio: number;
}
interface CampaniaP {
    id_campania: number;
    campania: string;
    anio: AnioProps;
}
interface Sector {
    id_sector: number;
    sector: string;
    campania: CampaniaP;
}
interface CampaniaProps {
    totalOrdenes: number;
    fk_id_sector: number;
    sector: Sector;
}

interface TablaProps {
    datos: CampaniaProps[];
}

function Tabla({ datos }: TablaProps) {
    const [data, setData] = useState<(string | number)[][]>([]);
    //Cargara los datos que vienen de la bd
    useEffect(() => {
        if (datos && datos.length > 0) {
            const formatted = datos.map((d) => [d.sector.campania.campania, d.sector.sector, d.sector.campania.anio.anio, d.totalOrdenes]);
            setData(formatted);
            console.log(formatted);
        }
    }, [datos]);

    // Funciones para exportar
    const celdaCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const exportarEnCsv = (): void => {
        const BOM = '\uFEFF';

        const csvContent =
            BOM +
            [
                'Campaña;Sector;Año;OrdenesTotales',
                ...datos.map(
                    (d) =>
                        `${celdaCSV(d.sector.campania.campania)};` +
                        `${celdaCSV(d.sector.sector)};` +
                        `${celdaCSV(d.sector.campania.anio.anio.toString())};` +
                        `${celdaCSV(d.totalOrdenes.toString())}`,
                ),
            ].join('\r\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'ReporteCampañas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportarEnPDF = () => {
        const printWindow = window.open('');
        if (printWindow) {
            const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>ReporteCampañas</title>
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
          <h1>Lista de Campañas</h1>
          <p>Generado el: ${new Date().toLocaleDateString('es-ES')}</p>
          <table>
            <thead>
              <tr>
                <th>Campaña</th>
                <th>Sector</th>
                <th>Año</th>
                <th>Total de Ordenes</th>
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
                  <td>${d.totalOrdenes}</td>
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
        const text =
            'Campaña\tSector\tAño\tTota de Ordenes\n' +
            datos.map((d) => `${d.sector.campania.campania}\t${d.sector.sector}\t${d.sector.campania.anio.anio}\t${d.totalOrdenes}`).join('\n');

        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert('Datos copiados al portapapeles');
            })
            .catch(() => {
                alert('Error al copiar los datos');
            });
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
                        <th>Total de Ordenes</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}

export default Tabla;
