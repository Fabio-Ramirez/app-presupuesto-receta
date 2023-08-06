import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  public nombre: string = '';
  public cantidad!: number;
  public unidadMedida: string = '';
  public precio!: number;
  public comentario: string = '';
  public ingrediente: Ingrediente = new Ingrediente;
  public mostrarModal: boolean = false;

  public mensajeToast: string = '';
  public mostrarToastFlag: boolean = false;
  public tipoToast: string = 'error';
  public progressToast: number = 0;

  public showModal: boolean = false;
  public modalTitle: string = '';
  public modalContent: string = '';
  public tipoConfirmacion: string = '';
  public ingredienteRestaurar: string = '';

  public modalExitoCrear: boolean = false;

  constructor(
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  agregarIngrediente() {
    this.ingrediente = {
      nombre: this.nombre.toUpperCase(),
      cantidad: this.cantidad,
      unidadMedida: this.unidadMedida,
      precio: this.precio,
      comentario: this.comentario,
      estado: 'creado'
    }
    this.mostrarModal = true;
    this.ingredienteService.agregarIngrediente(this.ingrediente).subscribe(
      (ingrediente) => {
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
            this.modalTitle = 'Error!! Ingrediente ya existente';
            if (error.error.existeIngrediente.estado === 'eliminado') {
              this.modalContent = `El ingrediente: ${error.error.existeIngrediente.nombre} fue eliminado! ¿Desea restaurarlo?`;
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

  cancelar() {
    this.router.navigate(['/ingrediente']);
  }


  closeModal(): void {
    if (this.tipoConfirmacion === 'crear') {
      this.router.navigate(['/agregarIngrediente']);
    }
    this.showModal = false;
  }

  confirmAction(): void {

    if (this.tipoConfirmacion === 'restaurar') {
      this.ingredienteService.restaurarIngrediente(this.ingredienteRestaurar).subscribe(ingrediente => {
        this.mensajeToast = `EXITO! se restauro el ingrediente: ${this.ingredienteRestaurar}`;
        this.mostrarToast();
      })
    }
    this.closeModal();
  }

  mostrarToast() {
    this.tipoToast = 'success';
    this.mostrarToastFlag = true;
    this.progressToast = 4000;
    setTimeout(() => {
      this.mostrarToastFlag = false;
      this.router.navigate(['/ingrediente']);
    }, 4000);

  }

  cerrarModal() {
    setTimeout(() => {
      this.modalExitoCrear = false;
      this.router.navigate(['/ingrediente']);
    }, 4000);
  }

}
