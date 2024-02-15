import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }
  agregar() {
    this.router.navigate(['/ingrediente']);
  }

  irReceta() {
    this.router.navigate(['/receta']);
  }

  irPresupuesto() {
    this.router.navigate(['/presupuesto']);
  }

}
