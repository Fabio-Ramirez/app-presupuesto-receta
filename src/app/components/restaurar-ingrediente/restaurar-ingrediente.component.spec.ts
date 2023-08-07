import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarIngredienteComponent } from './restaurar-ingrediente.component';

describe('RestaurarIngredienteComponent', () => {
  let component: RestaurarIngredienteComponent;
  let fixture: ComponentFixture<RestaurarIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarIngredienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
