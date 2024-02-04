import { Component, Input } from '@angular/core';

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

  closeModal(){
    this.show = false;
  }


  constructor(
  ) {

  }

  ngOnInit() {
  }

}
