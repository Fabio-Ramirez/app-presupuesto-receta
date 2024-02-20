import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, switchMap } from 'rxjs';

import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';
import { GatosAdicionales } from 'src/app/models/gastoAdicionales';
import { IngredienteEnReceta } from 'src/app/models/ingredienteEnReceta';
import { HttpErrorResponse } from '@angular/common/http';
import { MedidaService } from 'src/app/util/medida.service';
import { PrintService } from 'src/app/services/print.service'; 

@Component({
  selector: 'app-presupuesto-calculo',
  templateUrl: './presupuesto-calculo.component.html',
  styleUrls: ['./presupuesto-calculo.component.css']
})
export class PresupuestoCalculoComponent implements AfterViewInit {

  @ViewChild('contenidoParaImprimir', { static: true }) contenidoParaImprimir!: ElementRef;
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
  public precioTotal: number = 0;
  public cantidadIngrediente: number = 0;
  public unidadMedidaIngrediente: string = ''
  public listaGastos: GatosAdicionales[] = [];
  public receta: Receta = new Receta;

  public showModal: boolean = false;
  public showModalAgregar: boolean = false;
  public modalTitle: string = '';
  public modalContent: string = '';
  public tipoConfirmacion: string = '';
  public ingredienteRestaurar: string = '';
  public nombreGasto: string = ''
  public precioGasto: number = 0
  public opcionEditarGasto: boolean = false;
  public indexGasto: number = -1

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
    public medidaService: MedidaService, 
    public printService: PrintService
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
              const precioCalculado = (ingrediente.nombre.toLowerCase() !== "agua") ?
                this.calcularPrecio(ingredienteReceta, ingrediente) : 0;

              const ingredienteACargar = {
                id: ingredienteReceta.id,
                nombre: ingredienteReceta.nombre,
                produccion: {
                  cantidad: ingredienteReceta.produccion.cantidad,
                  unidadMedida: ingredienteReceta.produccion.unidadMedida
                },
                precio: precioCalculado.toFixed(2)   // Asignar el valor del precio obtenido
              };

              return of(ingredienteACargar);  // Retornar el objeto para que se propague al siguiente paso
            })
          )
          .subscribe(
            ingredienteCargado => {
              // Agregar el ingrediente al arreglo
              this.ingredientesEnReceta.push(ingredienteCargado);
              this.precioTotal += parseFloat(ingredienteCargado.precio);
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

      resultadoPrecio = this.medidaService.convertirValor(ingrediente.precio, ingrediente.cantidad, unidadConvertida)
    }
    return resultadoPrecio
  }

  recalcularPrecio() {

    const cantidadReceta = this.recetaEditar.produccion.cantidad;
    this.precioTotal = 0;

    this.ingredientesEnReceta.forEach((ingrediente, index) => {
      const cantidadActual = this.ingredientesEnRecetaClonado[index].produccion.cantidad;
      const precioActual = this.ingredientesEnRecetaClonado[index].precio;

      if (cantidadReceta !== 0) {
        ingrediente.produccion.cantidad = ((cantidadReceta * cantidadActual) / this.cantidad).toFixed(2);
        ingrediente.precio = ((ingrediente.produccion.cantidad * precioActual) / cantidadActual).toFixed(2);
        this.precioTotal += parseFloat(ingrediente.precio);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/presupuesto']);
  }

  editarIngrediente(ingrediente: IngredienteEnReceta) {
    this.showModal = true;
    this.modalTitle = `Editar medida para ${ingrediente.nombre}`;
    this.indiceEditado = this.ingredientesEnReceta.findIndex(i => {
      if (i.id === ingrediente.id) {
        this.cantidadIngrediente = i.produccion.cantidad;
        this.unidadMedidaIngrediente = i.produccion.unidadMedida;
        return true; // Indica que se encontró el elemento
      }
      return false;
    });

  }

  agregarGastos() {
    this.showModalAgregar = true;
    this.modalTitle = `Agregar gasto`;
  }

  verMedidas(ingrediente: any) {
    // Utiliza find para buscar el ingrediente en ingredientesEnReceta
    const ingredienteEnReceta = this.ingredientesEnReceta.find(ingr => ingr.id === ingrediente.id);

    return ingredienteEnReceta;
  }

  buscarIngrediente() {
    this.opcionBuscarIngredientes = false
  }



  closeModal(): void {
    this.showModal = false;
    this.modalTitle = ''
  }

  closeModalGasto(): void {
    this.showModalAgregar = false;
    this.modalTitle = ''
  }

  confirmAction(): void {
    if (this.cantidadIngrediente !== 0) {
      this.ingredientesEnReceta[this.indiceEditado].produccion.cantidad = this.cantidadIngrediente;

      const cantidadActual = this.ingredientesEnRecetaClonado[this.indiceEditado].produccion.cantidad;
      const precioActual = this.ingredientesEnRecetaClonado[this.indiceEditado].precio;
      this.precioTotal = this.precioTotal - this.ingredientesEnReceta[this.indiceEditado].precio
      this.ingredientesEnReceta[this.indiceEditado].precio = ((this.ingredientesEnReceta[this.indiceEditado].produccion.cantidad * precioActual) / cantidadActual).toFixed(2);
      this.precioTotal = this.precioTotal + this.ingredientesEnReceta[this.indiceEditado].precio
    }

    this.cantidadIngrediente = 0
    this.unidadMedidaIngrediente = ''
    this.showModal = false
    this.indiceEditado = -1
  }


  confirmGasto(): void {
    if (this.opcionEditarGasto) {
      this.precioTotal -= this.listaGastos[this.indexGasto].precio
      this.listaGastos[this.indexGasto].nombre = this.nombreGasto
      this.listaGastos[this.indexGasto].precio = this.precioGasto
      this.precioTotal += this.precioGasto

    }
    if (!this.opcionEditarGasto) {
      if (this.nombreGasto && this.precioGasto !== 0) {
        const nuevoGasto = {
          nombre: this.nombreGasto.toUpperCase(),
          precio: this.precioGasto
        }
        this.listaGastos.push(nuevoGasto);
        this.precioTotal += nuevoGasto.precio
      }
    }

    this.precioGasto = 0
    this.nombreGasto = ''
    this.showModalAgregar = false
    this.indexGasto = -1
    this.opcionEditarGasto = false
  }

  editarGasto(gasto: GatosAdicionales, index: number) {
    this.showModalAgregar = true;
    this.opcionEditarGasto = true
    this.modalTitle = `Editar el gasto ${gasto.nombre}`;
    this.indexGasto = index
    this.nombreGasto = gasto.nombre;
    this.precioGasto = gasto.precio;
  }

  eliminarGasto() {
    this.precioTotal -= this.listaGastos[this.indexGasto].precio;
    this.listaGastos.splice(this.indexGasto, 1);

    this.opcionEditarGasto = false
    this.precioGasto = 0
    this.nombreGasto = ''
    this.showModalAgregar = false
    this.indexGasto = -1
  }

  cerrarModal() {
    setTimeout(() => {
      this.showModal = false;
      this.router.navigate(['/receta']);
    }, 4000);
  }

  imprimir(): void {
    const contenidoElement = this.contenidoParaImprimir.nativeElement;

    if (contenidoElement) {
      const contentToPrint = contenidoElement.innerHTML;
      this.printService.print(contentToPrint);
    } else {
      console.error('No se encontró el elemento con el id "contenido-a-imprimir".');
    }
  }

  ngAfterViewInit(): void {
    // Ahora contenidoParaImprimir debería contener la referencia después de que la vista se haya inicializado
    if (this.contenidoParaImprimir) {
      const contenidoElement = this.contenidoParaImprimir.nativeElement;
      // Puedes usar contenidoElement según tus necesidades
    }
  }
}
