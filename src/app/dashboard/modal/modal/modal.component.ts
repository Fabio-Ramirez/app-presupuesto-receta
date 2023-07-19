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
  public precioNuevo: Number = 0;
  public nombreIngrediente: string = "";
  public idIngrediente: string = "";
  public parametros: any = {};


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
      window.location.reload();
    })

  }
}
