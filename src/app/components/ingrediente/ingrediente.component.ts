import { Component, OnInit } from '@angular/core';

import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent implements OnInit {

  public ingredientes!: Ingrediente[];

  constructor(private ingredienteService: IngredienteService) {

  }

  ngOnInit() {
    this.getIngredientes();
  }

  getIngredientes(): void {
    this.ingredienteService.getIngredientes()
      .subscribe(ingredientes => {
        console.log("Ingrediente ", ingredientes)
        return this.ingredientes = ingredientes
      });
  }
  editarIngrediente() {

  }
  eliminarIngrediente() {

  }
}
