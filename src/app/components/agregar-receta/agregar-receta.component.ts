import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteEnReceta } from 'src/app/models/ingredienteEnReceta';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})

export class AgregarRecetaComponent {

  public ingredientesSeleccionadosSend: Ingrediente[] = [];
  public ingredientesEnRecetaSend: IngredienteEnReceta[] = [];

  public producto: string = '';
  public cantidad!: number;
  public unidadMedida: string = '';
  public ingredientes!: IngredienteEnReceta[];
  public comentario: string = '';
  public receta: Receta = new Receta;
  public mostrarModal: boolean = false;



  public showModal: boolean = false;
  public modalTitle: string = '';
  public modalContent: string = '';
  public tipoConfirmacion: string = '';
  public ingredienteRestaurar: string = '';

  public modalExitoCrear: boolean = false;

  constructor(
    private recetaService: RecetaService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  agregarReceta() {
    if (!this.producto || this.cantidad === 0 || this.unidadMedida === '') {

      this.showModal = true;
      this.modalTitle = 'ERROR!! '
      this.modalContent = 'Falta completar datos.'
    }
    else {
      this.receta = {
        producto: this.producto.toUpperCase(),
        produccion: {
          cantidad: this.cantidad,
          unidadMedida: this.unidadMedida
        },
        ingredientes: this.ingredientes,
        estado: 'creado'
      }
      this.mostrarModal = true;
      this.recetaService.agregarReceta(this.receta).subscribe(
        (receta) => {
          // Respuesta exitosa (status 201)
          this.modalExitoCrear = true;
          this.cerrarModal();
        },
        (error) => {
          // Error en la solicitud (status 400 u otro error)
          if (error instanceof HttpErrorResponse) {
            // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción necesaria.
            // Por ejemplo, mostrar el mensaje de error en un componente de modal.
            if (error.error.existeIngrediente) {
              this.showModal = true;
              this.modalTitle = 'Error!! Receta ya existente';
              if (error.error.existeIngrediente.estado === 'eliminado') {
                this.modalContent = `El receta: ${error.error.existeIngrediente.nombre} fue eliminado! ¿Desea restaurarlo?`;
                this.tipoConfirmacion = 'restaurar',
                  this.ingredienteRestaurar = error.error.existeIngrediente.nombre
              }
              else {
                this.modalContent = `Desea agregar otro?`;
                this.tipoConfirmacion = 'crear'
              }
            }
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
    this.ingredientes = ingredientes;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalTitle = ''
  }

  confirmAction(): void {
  }

  cerrarModal() {
    setTimeout(() => {
      this.modalExitoCrear = false;
      this.router.navigate(['/receta']);
    }, 4000);
  }
}
