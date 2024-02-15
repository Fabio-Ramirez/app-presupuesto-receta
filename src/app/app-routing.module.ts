import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { MenuComponent } from './components/menu/menu.component';
import { EditarIngredienteComponent } from './components/editar-ingrediente/editar-ingrediente.component';
import { AgregarIngredienteComponent } from './components/agregar-ingrediente/agregar-ingrediente.component';
import { RecetaComponent } from './components/receta/receta.component';
import { AgregarRecetaComponent } from './components/agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './components/editar-receta/editar-receta.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component'
import {PresupuestoCalculoComponent } from './components/presupuesto-calculo/presupuesto-calculo.component'


const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'ingrediente', component: IngredienteComponent },
  { path: 'editarIngrediente/:id', component: EditarIngredienteComponent },
  { path: 'agregarIngrediente', component: AgregarIngredienteComponent },
  { path: 'receta', component: RecetaComponent },
  { path: 'agregarReceta', component: AgregarRecetaComponent },
  { path: 'editarReceta/:id', component: EditarRecetaComponent },
  { path: 'presupuesto', component: PresupuestoComponent },
  { path: 'presupuesto/:id', component: PresupuestoCalculoComponent },
  //Para cualquier otra ruta
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
