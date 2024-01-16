import { Ingrediente } from "./ingrediente";
export class Receta {
    _id?: string = '';
    producto: string = '';
    cantidad: number = 0;
    unidadMedida: string = '';
    ingredientes: Ingrediente [] = [];
    estado: string = '';
}