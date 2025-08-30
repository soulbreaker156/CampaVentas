import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FormularioProps } from '../../interfaces/interfaceFormulario';

export default React.memo(function FormularioAgregar({ sectores }: { sectores: FormularioProps[] }) {
    const [sector, setSector] = useState<string[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

    const { data, setData, post, errors } = useForm<{
        nombrecampana: string;
        sector: { sector: string | undefined; ordenes: string | undefined; ventas: string | undefined }[];
    }>({
        nombrecampana: '',
        sector: [],
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/guardarCampaña');
    }

    useEffect(() => {
        if (sectores && sectores.length > 0) {
            const sectoresNombres = sectores.map((sector) => sector.sector);
            setSector(sectoresNombres);
        }
    }, [sectores]);

    useEffect(() => {
        if (sector.length > 0 && data.sector.length === 0) {
            setData(
                'sector',
                sector.map((s) => ({ sector: s, ordenes: undefined, ventas: undefined })),
            );
        }
    }, [sector]);

    const crearFormulario = () => {
        if (data.nombrecampana === '') {
            alert('El nombre de la campaña no puede estar vacío');
            return;
        }
        setMostrarFormulario(true);
    };

    // Función para actualizar un campo específico
    const updateSectorField = (index: number, field: 'sector' | 'ordenes' | 'ventas', value: string) => {
        const newSector = data.sector.map((item, i) => (i === index ? { ...item, [field]: value } : item));
        setData('sector', newSector);
    };

    return (
        <>
            {/* Mostrar errores de validación */}
            {Object.keys(errors).length > 0 && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {Object.entries(errors).map(([field, message]) => (
                        <div key={field} className="text-sm">
                            <strong>{field}:</strong> {Array.isArray(message) ? message[0] : message}
                        </div>
                    ))}
                </div>
            )}

            <input 
                onChange={(e) => setData('nombrecampana', e.target.value)} 
                type="text" 
                placeholder="Crear campaña" 
                className="border p-1" 
            />
            <button onClick={crearFormulario} type="button" className="cursor-pointer border">
                Agregar
            </button>
            <div className="flex">
                {mostrarFormulario && (
                    <form onSubmit={submit} className="m-2 flex w-[100%] flex-col gap-2 border p-2">
                        {/* Headers */}
                        <div className="flex justify-between gap-2 font-bold text-sm text-gray-600">
                            <div className="w-[25%]">Campaña</div>
                            <div className="w-[25%]">Sector</div>
                            <div className="w-[25%]">Ordenes</div>
                            <div className="w-[25%]">Ventas</div>
                        </div>
                        
                        {data.sector.map((sec, i) => (
                            <div key={i} className="flex justify-between gap-2">
                                <input 
                                    readOnly 
                                    type="text" 
                                    className="w-[25%] border bg-gray-50" 
                                    value={data.nombrecampana} 
                                />
                                <input 
                                    readOnly 
                                    type="text" 
                                    className="w-[25%] border bg-gray-50" 
                                    value={sec.sector || ''} 
                                />
                                <input
                                    type="text"
                                    className="w-[25%] border"
                                    placeholder="Ingrese Ordenes"
                                    value={sec.ordenes || ''}
                                    onChange={(e) => updateSectorField(i, 'ordenes', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="w-[25%] border"
                                    placeholder="Ingrese Ventas"
                                    value={sec.ventas || ''}
                                    onChange={(e) => updateSectorField(i, 'ventas', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Guardar
                        </button>
                    </form>
                )}
            </div>
        </>
    );
});
