import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalIngredienteService } from 'src/app/services/modal-ingrediente.service';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.component.html',
  styleUrls: ['./editar-ingrediente.component.css']
})
export class EditarIngredienteComponent implements OnInit {

  public ingredienteEditar: Ingrediente = new Ingrediente;
  public ingredienteId: string = '';
  public modalConfirmacion: boolean = false;
  public modoEdicion: boolean = false;
  public parametros: any = {};
  constructor(
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute,
    private router: Router,
    public modalService: ModalIngredienteService,
  ) { }

  ngOnInit() {
    this.ingredienteId = this.route.snapshot.paramMap.get('id') as string;
    this.ingredienteService.getIngrediente(this.ingredienteId).subscribe(ingrediente => {
      this.ingredienteEditar = ingrediente;
    });
  }

  editarIngrediente() {
    this.modalConfirmacion = true;
  }

  cerrarModal() {
    this.modalConfirmacion = false;
  }
  guardarModificacion() {
    this.ingredienteService.setIngrediente(this.ingredienteEditar).subscribe(ingrediente => {
      this.router.navigate(['/ingrediente']);
    })
  }
  volverIngrediente() {
    this.router.navigate(['/ingrediente']);
  }

}
