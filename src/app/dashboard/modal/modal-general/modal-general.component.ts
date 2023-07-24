import { Component, Input } from '@angular/core';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-modal-general',
  templateUrl: './modal-general.component.html',
  styleUrls: ['./modal-general.component.css']
})
export class ModalGeneralComponent {

  @Input() parametrosModal: any = {};
  @Input() message: string = '';

  @Input() title: string = '';
  @Input() show: boolean = false;

  closeModal(): void {
    this.show = false;
  }


  constructor(
  ) {

  }

  ngOnInit() {

  }






}
