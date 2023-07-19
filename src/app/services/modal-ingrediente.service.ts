import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalIngredienteService {
  private modalVisiblePrecio = false;

  constructor() { }

  getModalVisiblePrecio(): boolean {
    return this.modalVisiblePrecio;
  }

  setModalVisiblePrecio(visible: boolean): void {
    this.modalVisiblePrecio = visible;
  }
}
