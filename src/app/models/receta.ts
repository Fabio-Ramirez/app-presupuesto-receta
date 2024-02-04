import { IngredienteEnReceta } from "./ingredienteEnReceta";
export class Receta {
    _id?: string = '';
    producto: string = '';
    produccion = {
        cantidad: 0,
        unidadMedida: ''
    }

    ingredientes: IngredienteEnReceta[] = [];
    estado: string = '';
}