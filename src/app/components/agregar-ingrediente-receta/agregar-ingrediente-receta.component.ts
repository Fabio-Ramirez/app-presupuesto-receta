import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of  } from 'rxjs';


import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-agregar-ingrediente-receta',
  templateUrl: './agregar-ingrediente-receta.component.html',
  styleUrls: ['./agregar-ingrediente-receta.component.css']
})
export class AgregarIngredienteRecetaComponent implements OnInit {


  public searchTerms = new Subject<string>();
  public search = '';
  public ingredientes$!: Observable<Ingrediente[]>;
  public ingredientes: Ingrediente[] = [];


  constructor(
    private ingredienteService: IngredienteService
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
      // Almacena los ingredientes encontrados en la propiedad 'ingredientes'
      this.ingredientes = ingredientes;
    });
  }

  buscarIngredientes() {
    this.searchTerms.next(this.search);
  }
}
