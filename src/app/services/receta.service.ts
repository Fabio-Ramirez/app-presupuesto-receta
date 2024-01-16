import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private apiUrl = 'http://localhost:3001/receta';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }
  getReceta(id: string): Observable<Receta> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Receta>(this.apiUrl + '/' + id);
  }
  agregarReceta(receta: Receta): Observable<Receta> {
    return this.http.post<Receta>(this.apiUrl, receta);
  }
  /*setIngrediente(receta: Receta): Observable<Receta> {
    const url = `${this.apiUrl}/${receta._id}`; // Ajusta la URL del endpoint según tu API

    return this.http.patch<Receta>(url, receta);
  }

  

  modificarPrecio(params: any): Observable<Receta> {
    const url = `${this.apiUrl}/precio/${params.idIngrediente}`; // Ajusta la URL del endpoint según tu API

    return this.http.patch<Receta>(url, params);
  }
  eliminarIngrediente(receta: Receta): Observable<Receta> {
    const url = `${this.apiUrl}/${receta.nombre}`;
    return this.http.delete<Receta>(url);
  }
  restaurarIngrediente(nombreIngrediente: string): Observable<Receta> {
    const url = `${this.apiUrl}/resturarIngrediente/${nombreIngrediente}`; // Ajusta la URL del endpoint según tu API
    return this.http.patch<Receta>(url, '');
  }
  getIngredientesEliminados(): Observable<Receta[]> {
    const url = `${this.apiUrl}/eliminados`;
    return this.http.get<Receta[]>(url);
  }*/
}
