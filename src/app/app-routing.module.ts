import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditarIngredienteComponent } from './components/editar-ingrediente/editar-ingrediente.component';
import { AgregarIngredienteComponent } from './components/agregar-ingrediente/agregar-ingrediente.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'ingrediente', component: IngredienteComponent },
  { path: 'editarIngrediente/:id', component: EditarIngredienteComponent },
  { path: 'agregarIngrediente', component: AgregarIngredienteComponent },
  //Para cualquier otra ruta
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
