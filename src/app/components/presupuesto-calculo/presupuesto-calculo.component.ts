import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, switchMap } from 'rxjs';

import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteEnReceta } from 'src/app/models/ingredienteEnReceta';
import { HttpErrorResponse } from '@angular/common/http';
import { MedidaService } from 'src/app/util/medida.service';

@Component({
  selector: 'app-presupuesto-calculo',
  templateUrl: './presupuesto-calculo.component.html',
  styleUrls: ['./presupuesto-calculo.component.css']
})
export class PresupuestoCalculoComponent {

  @Input() opcionBuscarIngredientes: boolean = false;

  public botonAgregarIngrediente: boolean = false;

  public producto: string = '';
  public cantidad!: number;
  public unidadMedida: string = '';
  public recetaEditar: Receta = new Receta;
  public recetaId: string = '';
  public comentario: string = '';
  public mostrarModal: boolean = false;
  public ingredientesEnReceta: any[] = [];
  public ingredientesEnRecetaClonado: any[] = [];


  public receta: Receta = new Receta;


  public showModal: boolean = false;
  public modalTitle: string = '';
  public modalContent: string = '';
  public tipoConfirmacion: string = '';
  public ingredienteRestaurar: string = '';

  public searchTerms = new Subject<string>();
  public search = '';
  public ingredientes: Ingrediente[] = [];
  public indiceEditado = -1;
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public ingredientesBuscadosEliminados: Ingrediente[] = [];

  public modalExitoCrear: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recetaService: RecetaService,
    private router: Router,
    public ingredienteService: IngredienteService,
    public medidaService: MedidaService
  ) {

  }

  ngOnInit() {

    this.recetaId = this.route.snapshot.paramMap.get('id') as string;
    this.recetaService.getReceta(this.recetaId).subscribe(receta => {
      this.recetaEditar = receta;
      this.cargarIngredientes(receta.ingredientes);
      this.producto = this.recetaEditar.producto;
      this.cantidad = this.recetaEditar.produccion.cantidad;
      this.unidadMedida = this.recetaEditar.produccion.unidadMedida;
    });


  }

  cargarIngredientes(ingredientes: IngredienteEnReceta[]) {

    ingredientes.forEach(ingredienteReceta => {

      if (ingredienteReceta?.id) {
        this.ingredienteService.getIngrediente(ingredienteReceta.id)
          .pipe(
            switchMap(ingrediente => {

              const ingredienteACargar = {
                id: ingredienteReceta.id,
                nombre: ingredienteReceta.nombre,
                produccion: {
                  cantidad: ingredienteReceta.produccion.cantidad,
                  unidadMedida: ingredienteReceta.produccion.unidadMedida
                },
                precio: this.calcularPrecio(ingredienteReceta, ingrediente).toFixed(2)  // Asignar el valor del precio obtenido
              };

              return of(ingredienteACargar);  // Retornar el objeto para que se propague al siguiente paso
            })
          )
          .subscribe(
            ingredienteCargado => {
              // Agregar el ingrediente al arreglo
              this.ingredientesEnReceta.push(ingredienteCargado);
              // Copiar profundamente el array después de cargar ingredientes
              this.ingredientesEnRecetaClonado = JSON.parse(JSON.stringify(this.ingredientesEnReceta));
            },
            error => {
              // Manejar errores si es necesario
              console.error(error);
            }
          );
      }
    })

  }

  calcularPrecio(ingredienteReceta: any, ingrediente: Ingrediente) {
    const unidadConvertida = this.medidaService.convertirUnidad(ingredienteReceta.produccion.cantidad,
      ingredienteReceta.produccion.unidadMedida,
      ingrediente.unidadMedida)
    let resultadoPrecio = ingrediente.precio;
    if (typeof unidadConvertida === 'number' && typeof ingrediente?.precio === 'number') {
      resultadoPrecio = unidadConvertida * ingrediente.precio;
    }
    return resultadoPrecio
  }

  recalcularPrecio() {

    const cantidadReceta = this.recetaEditar.produccion.cantidad;

    this.ingredientesEnReceta.forEach((ingrediente, index) => {
      const cantidadActual = this.ingredientesEnRecetaClonado[index].produccion.cantidad;
      const precioActual = this.ingredientesEnRecetaClonado[index].precio;

      if (cantidadReceta !== 0) {
        ingrediente.produccion.cantidad = ((cantidadReceta * cantidadActual) / this.cantidad).toFixed(2);
        ingrediente.precio = ((ingrediente.produccion.cantidad * precioActual) / cantidadActual).toFixed(2);
      }
    });
  }



  cancelar() {
    this.router.navigate(['/receta']);
  }

  editarIngrediente(ingrediente: IngredienteEnReceta) {
    this.showModal = true;
    this.modalTitle = `Agregar medida para ${ingrediente.nombre}`;
    this.indiceEditado = this.ingredientesEnReceta.findIndex(i => {
      if (i.id === ingrediente.id) {
        this.cantidad = i.produccion.cantidad;
        this.unidadMedida = i.produccion.unidadMedida;
        return true; // Indica que se encontró el elemento
      }
      return false;
    });

  }

  verMedidas(ingrediente: any) {
    // Utiliza find para buscar el ingrediente en ingredientesEnReceta
    const ingredienteEnReceta = this.ingredientesEnReceta.find(ingr => ingr.id === ingrediente.id);

    return ingredienteEnReceta;
  }

  buscarIngrediente() {
    this.opcionBuscarIngredientes = false
  }

  quitarBuscarIngrediente() {
    this.opcionBuscarIngredientes = true
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
