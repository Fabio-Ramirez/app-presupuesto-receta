import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appPlaceholderFocus]'
})
export class PlaceholderFocusDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus')
  onFocus() {
    this.renderer.setAttribute(this.el.nativeElement, 'placeholder', '');
  }

  @HostListener('blur')
  onBlur() {
    this.renderer.setAttribute(this.el.nativeElement, 'placeholder', '0');
  }
}
