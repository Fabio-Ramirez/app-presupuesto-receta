import { TestBed } from '@angular/core/testing';

import { ModalIngredienteService } from './modal-ingrediente.service';

describe('ModalIngredienteService', () => {
  let service: ModalIngredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalIngredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
