import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';


import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { IngredienteEnReceta } from 'src/app/models/ingredienteEnReceta';
import { MedidaService } from 'src/app/util/medida.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-agregar-ingrediente-receta',
  templateUrl: './agregar-ingrediente-receta.component.html',
  styleUrls: ['./agregar-ingrediente-receta.component.css']
})
export class AgregarIngredienteRecetaComponent implements OnInit {

  @Output() ingredientesEnRecetaSend = new EventEmitter<IngredienteEnReceta[]>();
  @Input() opcionBuscarIngredientes: boolean = false;
  @Input() ingredientesEnReceta: IngredienteEnReceta[] = [];

  public searchTerms = new Subject<string>();
  public search = '';
  public ingredientes: Ingrediente[] = [];
  public indiceEditado = -1;
  public ingredienteSeleccionado: Ingrediente = new Ingrediente;
  public ingredientesBuscadosEliminados: Ingrediente[] = [];
  // Por ejemplo, puedes acceder a una propiedad o método del servicio:
  public unidadMedidaExistentes = this.medidaService.getUnidadIngrediente();


  public showModal: boolean = false;
  public modalTitle: string = '';
  public cantidad: number = 0;
  public unidadMedida: string = '';

  constructor(
    private ingredienteService: IngredienteService,
    private medidaService: MedidaService,
    public recetaService: RecetaService
  ) { }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        // Verifica si el término de búsqueda no es nulo ni vacío antes de hacer la llamada a la API
        if (term?.trim() !== '') {
          return this.ingredienteService.buscarIngredientes(term);
        } else {
          // Retorna un observable vacío si el término es nulo o vacío
          return of([]);
        }
      })
    ).subscribe(ingredientes => {
      // Filtra los ingredientes que no están en ingredientesSeleccionados
      const ingredientesFiltrados = ingredientes.filter(ingrediente =>
        !this.ingredientes.some(seleccionado => seleccionado._id === ingrediente._id) &&
        !this.ingredientesEnReceta.some(seleccionado => seleccionado.id === ingrediente._id)
      );
      // Almacena los ingredientes filtrados en la propiedad 'ingredientes'
      this.ingredientes = ingredientesFiltrados;
    });
  }

  buscarIngredientes() {
    this.searchTerms.next(this.search);
  }

  agregarIngrediente(ingrediente: Ingrediente) {
    this.showModal = true;
    this.modalTitle = `Agregar medida para ${ingrediente.nombre}`;
    this.ingredienteSeleccionado = ingrediente;
  }

  eliminarIngrediente(ingrediente: IngredienteEnReceta) {
    const indexEliminar = this.ingredientesEnReceta.indexOf(ingrediente);
    if (indexEliminar !== -1) {
      this.ingredientesEnReceta.splice(indexEliminar, 1);
    }

    const indexAgregar = this.ingredientesBuscadosEliminados.findIndex(item => item._id === ingrediente.id);
    if (indexAgregar !== -1) {
      if (this.search) {
        this.ingredientes.push(this.ingredientesBuscadosEliminados[indexAgregar]);
      }
      this.ingredientesBuscadosEliminados.splice(indexEliminar, 1);
    }
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

  closeModal() {
        this.showModal = false;
    this.modalTitle = ''
  }

  confirmAction() {

    const ingredienteEnReceta = {
      id: this.ingredienteSeleccionado._id,
      nombre: this.ingredienteSeleccionado.nombre,
      produccion: {
        cantidad: this.cantidad, // Modifica la cantidad
        unidadMedida: this.unidadMedida, // Modifica la unidad de medida
      }
    }

    if (this.indiceEditado !== -1) {
      this.ingredientesEnReceta[this.indiceEditado].produccion.cantidad = this.cantidad
      this.ingredientesEnReceta[this.indiceEditado].produccion.unidadMedida = this.unidadMedida
    }


    if (this.indiceEditado === -1) {
      this.ingredientesEnReceta.push(ingredienteEnReceta)
      const indexEliminar = this.ingredientes.indexOf(this.ingredienteSeleccionado);
      if (indexEliminar !== -1) {
        this.ingredientes.splice(indexEliminar, 1);
        this.ingredientesBuscadosEliminados.push(this.ingredienteSeleccionado)
      }
    }

    this.ingredientesEnRecetaSend.emit(this.ingredientesEnReceta)
    this.cantidad = 0
    this.unidadMedida = ''
    this.showModal = false
    this.indiceEditado = -1
  }

  verMedidas(ingrediente: IngredienteEnReceta) {
    // Utiliza find para buscar el ingrediente en ingredientesEnReceta
    const ingredienteEnReceta = this.ingredientesEnReceta.find(item => item.id === ingrediente.id);

    return ingredienteEnReceta;
  }

  buscarIngrediente() {
    this.opcionBuscarIngredientes = false
  }

  quitarBuscarIngrediente() {
    this.opcionBuscarIngredientes = true
  }
}
