import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {


  @Input() message: string = '';
  @Input() show: boolean = true;
  @Input() type: string = 'success';
  @Input() progress: number = 0;

  constructor() { }

  ngOnInit() {

  }
}
