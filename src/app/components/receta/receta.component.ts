import { Component } from '@angular/core';
import { Receta } from '../../models/receta';
import { Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {

  public recetas!: Receta[];
  public recetaSeleccionado: Receta = new Receta;
  public recetaEliminar: Receta = new Receta;
  public recetaOpcion: Receta = new Receta;
  public idReceta: string = "";
  public parametros: any = {};
  search: string = '';
  public verOpcion = true;
  public modalEliminar: boolean = false;
  public modalExitoEliminar: boolean = false;

  public tipoToast: string = 'success';
  public mensajeToast: string = 'Este es un mensaje de éxito.';
  public mostrarToastFlag: boolean = false;

  public mostrarRecetaEliminados: boolean = false;
  public volver = true;

  constructor(
    private recetaService: RecetaService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getRecetas();

  }

  getRecetas(): void {
    this.recetaService.getRecetas()
      .subscribe(recetas => {
        return this.recetas = recetas
      });
  }
  seleccionarReceta(receta: Receta) {

  }

  agregarReceta() {
    this.router.navigate(['/agregarReceta']);
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


  eliminarReceta(receta: Receta) {
    this.modalEliminar = true;
    this.recetaEliminar = receta;
  }

  verOpciones(receta: Receta) {
   
    this.router.navigate(['/editarReceta', receta._id]);
  }

  confirmarEliminacion() {

  }

  editarPrecio(receta: Receta) {

  }

  mostrarToast() {


  }

  mostrarEliminados() {

  }

  // Método que maneja los datos enviados por el componente hijo
  onShowChanged(show: boolean) {
    this.mostrarRecetaEliminados = show;
    // Realizar acciones adicionales según sea necesario
  }
}
