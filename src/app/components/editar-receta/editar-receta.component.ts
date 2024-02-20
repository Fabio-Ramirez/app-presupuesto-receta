import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteEnReceta } from 'src/app/models/ingredienteEnReceta';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.css']
})
export class EditarRecetaComponent implements OnInit {


  public botonAgregarIngrediente: boolean = false;

  public producto: string = '';
  public cantidad!: number;
  public unidadMedida: string = '';
  public recetaEditar: Receta = new Receta;
  public recetaId: string = '';
  public comentario: string = '';
  public mostrarModal: boolean = false;
  public ingredientesEnReceta: IngredienteEnReceta[] = [];
  public receta: Receta = new Receta;

  public showModal: boolean = false;
  public modalTitle: string = '';
  public modalContent: string = '';
  public tipoConfirmacion: string = '';
  public ingredienteRestaurar: string = '';

  public modalExitoCrear: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recetaService: RecetaService,
    private router: Router,
  ) {

  }

  ngOnInit() {

    this.recetaId = this.route.snapshot.paramMap.get('id') as string;
    this.recetaService.getReceta(this.recetaId).subscribe(receta => {
      this.recetaEditar = receta;
      this.ingredientesEnReceta = this.recetaEditar.ingredientes;
      this.producto = this.recetaEditar.producto;
      this.cantidad = this.recetaEditar.produccion.cantidad;
      this.unidadMedida = this.recetaEditar.produccion.unidadMedida;
    });


  }

  agregarReceta() {
    if (!this.producto || this.cantidad === 0 || this.unidadMedida === '') {
      this.showModal = true;
      this.modalTitle = 'ERROR!! '
      this.modalContent = 'Falta completar datos.'
    }
    else {
      this.receta = {
        _id: this.recetaId,
        producto: this.producto.toUpperCase(),
        produccion: {
          cantidad: this.cantidad,
          unidadMedida: this.unidadMedida
        },
        ingredientes: this.ingredientesEnReceta,
        estado: 'creado'
      }
      this.recetaService.modificarReceta(this.receta).subscribe(
        (data) => {
          // Respuesta exitosa (status 201)
          this.modalExitoCrear = true;
          this.modalContent = 'Receta ' + this.receta.producto + ' modificado correctamente!'
          this.cerrarModal();
        },
        (error) => {
          // Error en la solicitud (status 400 u otro error)
          if (error instanceof HttpErrorResponse) {
            console.error("Error desconocido:", error);
          } else {
            console.error("Error desconocido:", error);
            // Aquí puedes manejar otros tipos de errores si es necesario.
          }
        }
      );
    }

  }

  cancelar() {
    this.router.navigate(['/receta']);
  }

  onIngredientesSeleccionados(ingredientes: IngredienteEnReceta[]) {
    this.ingredientesEnReceta = ingredientes;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalTitle = ''
  }

  confirmAction(): void {
  }

  cerrarModal() {
    setTimeout(() => {
      this.showModal = false;
      this.router.navigate(['/receta']);
    }, 4000);
  }
}
