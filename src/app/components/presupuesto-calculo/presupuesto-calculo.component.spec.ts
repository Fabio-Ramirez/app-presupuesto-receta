import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoCalculoComponent } from './presupuesto-calculo.component';

describe('PresupuestoCalculoComponent', () => {
  let component: PresupuestoCalculoComponent;
  let fixture: ComponentFixture<PresupuestoCalculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestoCalculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestoCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
