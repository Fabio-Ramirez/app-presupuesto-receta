import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  unidadIngrediente: string[] = ['kg', 'grs', 'lt', 'ml', 'cc']; // Puedes agregar más unidades según sea necesario
  unidadProducto: string[] = ['kg', 'grs', 'docena', 'mts', 'unidad', 'latas'];

  constructor() { }

  getUnidadIngrediente(){
    return this.unidadIngrediente;
  }

  getUnidadProducto(){
    return this.unidadProducto;
  }
  
  convertirUnidad(valor: number, unidadOrigen: string, unidadDestino: string): number {
    // Lógica de conversión aquí
    // Por ahora, supongamos que solo manejamos conversiones entre gramos (g) y kilogramos (kg)
    if (unidadOrigen === 'grs' && unidadDestino === 'kg') {
      return valor / 1000;
    } else if (unidadOrigen === 'kg' && unidadDestino === 'grs') {
      return valor * 1000;
    }

    // Agrega más lógica de conversión según sea necesario
    return valor;
  }
}
