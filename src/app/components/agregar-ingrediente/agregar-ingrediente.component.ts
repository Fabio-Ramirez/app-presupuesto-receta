import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from 'src/app/models/ingrediente';

@Component({
  selector: 'app-agregar-ingrediente',
  templateUrl: './agregar-ingrediente.component.html',
  styleUrls: ['./agregar-ingrediente.component.css']
})
export class AgregarIngredienteComponent implements OnInit {

  public nombre: string = '';
  public cantidad: number = 0;
  public unidadMedida: string = '';
  public precio: number = 0;
  public comentario: string = '';
  public categoria: string = '';
  public ingrediente: Ingrediente = new Ingrediente;
  public mostrarModal: boolean = false;

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
      categoria: this.categoria
    }
    this.mostrarModal = true;
    this.ingredienteService.agregarIngrediente(this.ingrediente).subscribe(ingrediente => {

    })
  }

  volverIngrediente() {
    this.router.navigate(['/ingrediente']);
  }


}
