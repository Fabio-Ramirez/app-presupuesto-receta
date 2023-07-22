import { Component, Input, OnInit } from '@angular/core';

import { ModalIngredienteService } from '../../../services/modal-ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() parametrosModal: any = {};

  public ingredientes!: Ingrediente[];
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public precioActual: Number = 0;
  public precioNuevo!: Number;
  public nombreIngrediente: string = "";
  public idIngrediente: string = "";
  public parametros: any = {};
  public mensajeToast: string = '';
  public mostrarToastFlag: boolean = false;
  public toast: string = 'success';


  constructor(
    private ingredienteService: IngredienteService,
    public modalService: ModalIngredienteService
  ) {

  }

  ngOnInit() {

  }

  cerrarModalPrecio() {
    this.modalService.setModalVisiblePrecio(false);
  }

  guardarPrecio() {
    this.parametrosModal.precio = this.precioNuevo;
    this.ingredienteService.modificarPrecio(this.parametrosModal).subscribe(ingrediente => {
      this.mostrarToast();
    })

  }

  mostrarToast() {
    this.mensajeToast = 'EXITO! Se cambio el precio del ingrediente.'
    this.mostrarToastFlag = true;
    setTimeout(() => {
      this.mostrarToastFlag = false;
      window.location.reload();
    }, 2000);

  }
}
