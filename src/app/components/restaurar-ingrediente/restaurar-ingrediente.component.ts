
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { ModalIngredienteService } from '../../services/modal-ingrediente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurar-ingrediente',
  templateUrl: './restaurar-ingrediente.component.html',
  styleUrls: ['./restaurar-ingrediente.component.css']
})
export class RestaurarIngredienteComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() search: string = '';
  @Output() showChanged = new EventEmitter<boolean>();

  public ingredientesEliminados!: Ingrediente[];
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public ingredienteRestaurar: Ingrediente = new Ingrediente;
  public ingredienteOpcion: Ingrediente = new Ingrediente;
  public idIngrediente: string = "";

  public modalRestaurar: boolean = false;

  public tipoToast: string = 'success';
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
    this.ingredienteService.getIngredientesEliminados()
      .subscribe(ingredientes => {
        return this.ingredientesEliminados = ingredientes
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

  volverIngrediente() {

  }

  // Método que emite el evento cuando se realiza una acción en el componente hijo
  emitShowChange() {
    this.show = false;
    this.showChanged.emit(this.show);
  }


  verOpciones(ingrediente: Ingrediente, opcion: string) {
    this.ingredienteOpcion = ingrediente;

    if (opcion === 'restaurar') {
      this.ingredienteRestaurar = ingrediente;
      this.modalRestaurar = true;
    }

  }

  confirmarRestauracion() {
    if (this.ingredienteRestaurar) {
      this.ingredienteService.restaurarIngrediente(this.ingredienteRestaurar.nombre).subscribe(ingrediente => {
        this.cerrarModal();
        this.mostrarToast();
      });
    }
  }

  mostrarToast() {
    this.mensajeToast = `EXITO! Se resturó el ingrediente: ${this.ingredienteRestaurar.nombre}`;
    this.mostrarToastFlag = true;
    setTimeout(() => {
      this.mostrarToastFlag = false;
      window.location.reload();
    }, 4000);

  }

  cerrarModal() {
    this.modalRestaurar = false;
  }

}
