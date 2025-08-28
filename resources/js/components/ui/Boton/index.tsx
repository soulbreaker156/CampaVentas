export default function Boton({ datos }: { datos: string[] }) {
    const listadoCampanas = datos.map((nombre, index) => {
        return (
            <option key={index} value={nombre}>
                {nombre}
            </option>
        );
    });
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2">
                <label htmlFor="Campanas">Campañas</label>
                <select name="Campañas" id="campanas">
                    <option value="#">--Seleccione una opción</option>
                    {listadoCampanas}
                </select>
            </div>
        </>
    );
}
