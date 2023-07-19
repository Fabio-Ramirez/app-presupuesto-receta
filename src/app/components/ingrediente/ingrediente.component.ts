import { Component, OnInit } from '@angular/core';

import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  public ingredientes!: Ingrediente[];
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public modalEditarPrecio: boolean = false;
  public precioActual: Number = 0;
  public precioNuevo: Number = 0;
  public nombreIngrediente: string = "";
  public idIngrediente: string = "";
  public parametros: any = {};


  constructor(
    private ingredienteService: IngredienteService,
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

  eliminarIngrediente() {

  }

  editarPrecio(ingrediente: Ingrediente) {
    this.modalEditarPrecio = true;
    this.parametros = {
      idIngrediente: ingrediente?._id as string,
      precio: ingrediente?.precio,
      nombre: ingrediente?.nombre
    }

  }
  cerrarModalPrecio() {
    this.modalEditarPrecio = false;
  }

  guardarPrecio() {

    this.parametros.precio = this.precioNuevo;
    this.ingredienteService.modificarPrecio(this.parametros).subscribe(ingrediente => {
      window.location.reload();
    })

  }
}
