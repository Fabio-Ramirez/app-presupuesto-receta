import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarIngredienteComponent } from './components/editar-ingrediente/editar-ingrediente.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AgregarIngredienteComponent } from './components/agregar-ingrediente/agregar-ingrediente.component';
import { ModalComponent } from './dashboard/modal/modal/modal.component';
import { FilterPipe } from './pipe/filter.pipe';
import { ToastComponent } from './dashboard/toast/toast/toast.component';
import { PlaceholderFocusDirective } from './dashboard/directive/placeholder-focus.directive';



@NgModule({
  declarations: [
    AppComponent,
    IngredienteComponent,
    MenuComponent,
    EditarIngredienteComponent,
    NavbarComponent,
    AgregarIngredienteComponent,
    ModalComponent,
    FilterPipe,
    ToastComponent,
    PlaceholderFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
