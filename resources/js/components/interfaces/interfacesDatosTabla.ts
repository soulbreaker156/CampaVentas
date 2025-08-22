
export interface AnioProps {
    id_anio: number;
    anio: number;
}
export interface CampaniaP {
    id_campania: number;
    campania: string;
    anio: AnioProps;
}
export interface Sector {
    id_sector: number;
    sector: string;
    campania: CampaniaP;
}
export interface CampaniaProps {
    totalOrdenes?: number;
    totalVentas?: number;
    fk_id_sector: number;
    sector: Sector;
}