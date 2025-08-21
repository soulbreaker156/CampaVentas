import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { useEffect, useState } from "react";
import '../../../../css/tablastyle.css';

DataTable.use(DT);

interface Rol {
  id_rol: number;
  rol: string;
}

interface User {
  usuario: string;
  id_rol: number;
  rol: Rol;
}

interface TablaProps {
  datos: User[];
}

function Tabla({ datos }: TablaProps) {
  const [data, setData] = useState<(string | number)[][]>([]);
 //Cargara los datos que vienen de la bd
  useEffect(() => {
    if (datos && datos.length > 0) {
      const formatted = datos.map((d) => [d.usuario, d.rol.rol]);
      setData(formatted);
    }
  }, [datos]);

  // Funciones para exportar
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Usuario,Puesto\n"
      + datos.map(d => `${d.usuario},${d.rol.rol}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const printWindow = window.open('');
    if (printWindow) {
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Reporte</title>
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
          <h1>Lista de Usuarios</h1>
          <p>Generado el: ${new Date().toLocaleDateString('es-ES')}</p>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Puesto</th>
              </tr>
            </thead>
            <tbody>
              ${datos.map(d => `
                <tr>
                  <td>${d.usuario}</td>
                  <td>${d.rol.rol}</td>
                </tr>
              `).join('')}
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

  const printTable = () => {
    exportToPDF();
  };

  const copyToClipboard = () => {
    const text = "Usuario\tPuesto\n" +
      datos.map(d => `${d.usuario}\t${d.rol.rol}`).join("\n");

    navigator.clipboard.writeText(text).then(() => {
      alert('Datos copiados al portapapeles');
    }).catch(() => {
      alert('Error al copiar los datos');
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-[100%] w-[100%] text-black">
      {/* Botones de exportación */}
      <div className="export-buttons mb-4">
        <button
          onClick={exportToCSV}
          className="export-btn excel-btn"
        >
          📊 Excel
        </button>
        <button
          onClick={exportToPDF}
          className="export-btn pdf-btn"
        >
          📄 PDF
        </button>
        <button
          onClick={printTable}
          className="export-btn print-btn"
        >
          🖨️ Imprimir
        </button>
        <button
          onClick={copyToClipboard}
          className="export-btn copy-btn"
        >
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
          lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],

        }}
      >
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Puesto</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
}

export default Tabla;