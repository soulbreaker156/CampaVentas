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
            <select name={elegirTitulo} id={elegirTitulo} onChange={handleChange}>
                <option value="">{elegirTitulo}</option>
                {listadoCampanas}
            </select>
        </>
    );
}
