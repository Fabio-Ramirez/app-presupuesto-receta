import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private apiUrl = 'http://localhost:3001/ingrediente';

  constructor(private http: HttpClient) { }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }
  getIngrediente(id: string): Observable<Ingrediente> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Ingrediente>(this.apiUrl + '/' + id);
  }

  // En tu servicio
  buscarIngredientes(term: string): Observable<Ingrediente[]> {
    const url = `${this.apiUrl}/buscarIngredienteNombre/${term}`;
    return this.http.get<Ingrediente[]>(url);
  }

  setIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    const url = `${this.apiUrl}/${ingrediente._id}`; // Ajusta la URL del endpoint según tu API

    return this.http.patch<Ingrediente>(url, ingrediente);
  }

  agregarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }

  modificarPrecio(params: any): Observable<Ingrediente> {
    const url = `${this.apiUrl}/precio/${params.idIngrediente}`; // Ajusta la URL del endpoint según tu API

    return this.http.patch<Ingrediente>(url, params);
  }
  eliminarIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    const url = `${this.apiUrl}/${ingrediente.nombre}`;
    return this.http.delete<Ingrediente>(url);
  }
  restaurarIngrediente(nombreIngrediente: string): Observable<Ingrediente> {
    const url = `${this.apiUrl}/resturarIngrediente/${nombreIngrediente}`; // Ajusta la URL del endpoint según tu API
    return this.http.patch<Ingrediente>(url, '');
  }
  getIngredientesEliminados(): Observable<Ingrediente[]> {
    const url = `${this.apiUrl}/eliminados`;
    return this.http.get<Ingrediente[]>(url);
  }

}
