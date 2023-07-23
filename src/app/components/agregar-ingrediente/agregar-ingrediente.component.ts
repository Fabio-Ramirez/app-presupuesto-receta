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

  constructor(
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

  }

  agregarIngrediente() {
    this.ingrediente = {

      nombre: this.nombre,
      cantidad: this.cantidad,
      unidadMedida: this.unidadMedida,
      precio: this.precio,
      comentario: this.comentario,
      estado: 'creado'
    }
    this.mostrarModal = true;


    // ...

    this.ingredienteService.agregarIngrediente(this.ingrediente).subscribe(
      (ingrediente) => {
        // Respuesta exitosa (status 201)
        // Aquí puedes mostrar un mensaje de éxito o realizar cualquier otra acción necesaria.
      },
      (error) => {
        // Error en la solicitud (status 400 u otro error)
        if (error instanceof HttpErrorResponse) {
          // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción necesaria.
          // Por ejemplo, mostrar el mensaje de error en un componente de toast.
          this.mostrarToastFlag = true;
          this.mensajeToast = "Error al agregar el ingrediente: " + error.error.message;
          setTimeout(() => {
            this.mostrarToastFlag = false;
          }, 5000);
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


}
