import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIngredienteRecetaComponent } from './agregar-ingrediente-receta.component';

describe('AgregarIngredienteRecetaComponent', () => {
  let component: AgregarIngredienteRecetaComponent;
  let fixture: ComponentFixture<AgregarIngredienteRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarIngredienteRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarIngredienteRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
