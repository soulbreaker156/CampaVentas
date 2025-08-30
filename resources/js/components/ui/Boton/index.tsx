export default function Boton({ datos, filtro }: { datos: string[]; filtro: (valor: string) => void }) {
    // Eliminar duplicados y convertir a array
    const data = Array.from(new Set(datos));

    let elegirTitulo: string = obtenerTitulo();
    // Función para obtener el título del botón según los datos
    function obtenerTitulo() {
        if (data.some((dato) => dato.toLowerCase().includes('campaña'))) {
            return '--Elegir Campaña';
        } else {
            return '--Elegir Sector';
        }
    }
    // Crear las opciones del select
    const listadoCampanas = data.map((nombre, index) => {
        return (
            <option key={index} value={nombre}>
                {nombre}
            </option>
        );
    });
    // Manejar el cambio de selección
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        filtro(event.target.value);
    };
    return (
        <>
            <select name={elegirTitulo} id={elegirTitulo} onChange={handleChange} className="rounded-md border border-gray-300 bg-white sm:min-w-[40%] sm:text-[19px]  px-1 sm:py-5 md:py-5 py-1 min-w-[400%] pr-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <option value="">{elegirTitulo}</option>
                {listadoCampanas}
            </select>
        </>
    );
}
