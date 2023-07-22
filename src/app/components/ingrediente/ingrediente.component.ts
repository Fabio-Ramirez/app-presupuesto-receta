import { Component, OnInit } from '@angular/core';

import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { ModalIngredienteService } from '../../services/modal-ingrediente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  public ingredientes!: Ingrediente[];
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public ingredienteEliminar: Ingrediente = new Ingrediente;
  public idIngrediente: string = "";
  public parametros: any = {};
  search: string = '';
  public modalEliminar: boolean = false;
  public modalExitoEliminar: boolean = false;
  public mensajeToast: string = 'Este es un mensaje de éxito.';
  public mostrarToastFlag: boolean = false;


  constructor(
    private ingredienteService: IngredienteService,
    public modalService: ModalIngredienteService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getIngredientes();
  }

  getIngredientes(): void {
    this.ingredienteService.getIngredientes()
      .subscribe(ingredientes => {

        return this.ingredientes = ingredientes
      });
  }
  seleccionarIngrediente(ingrediente: Ingrediente) {
    this.ingredienteSeleccionado = ingrediente;
    if (this.ingredienteSeleccionado?._id) {
      this.ingredienteService.getIngrediente(this.ingredienteSeleccionado._id).subscribe(ingrediente => {

        if (ingrediente?._id) {
          this.router.navigate(['/editarIngrediente', ingrediente._id]);
        }
      });
    }
  }

  agregarIngrediente() {
    this.router.navigate(['/agregarIngrediente']);
  }

  confirmacionEliminar() {
    this.modalEliminar = true;

  }

  cerrarModal() {
    this.modalEliminar = false;
  }
  cerrarModalExito() {
    this.modalExitoEliminar = false;
  }


  eliminarIngrediente(ingrediente: Ingrediente) {
    this.modalEliminar = true;
    this.ingredienteEliminar = ingrediente;
  }

  confirmarEliminacion() {
    if (this.ingredienteEliminar) {
      this.ingredienteService.eliminarIngrediente(this.ingredienteEliminar).subscribe(ingrediente => {
        this.modalEliminar = false;
        this.mostrarToast();
      });
    }
  }

  editarPrecio(ingrediente: Ingrediente) {
    this.parametros = {
      idIngrediente: ingrediente?._id as string,
      precio: ingrediente?.precio,
      nombre: ingrediente?.nombre
    }
    this.modalService.setModalVisiblePrecio(true);
  }

  mostrarToast() {
    this.mostrarToastFlag = true;
    setTimeout(() => {
      this.mostrarToastFlag = false;
    }, 2000);
    window.location.reload();
  }
}
