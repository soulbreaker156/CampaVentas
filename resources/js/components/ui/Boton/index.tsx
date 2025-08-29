export default function Boton({ datos, filtro }: { datos: string[]; filtro: (valor: string) => void }) {
    let elegirTitulo: string = obtenerTitulo();

    function obtenerTitulo() {
        if (datos.some((dato) => dato.toLowerCase().includes('campaña'))) {
            return '--Elegir Campaña';
        } else {
            return '--Elegir Sector';
        }
    }

    const listadoCampanas = datos.map((nombre, index) => {
        return (
            <option key={index} value={nombre}>
                {nombre}
            </option>
        );
    });

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
