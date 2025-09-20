import { TestBed } from '@angular/core/testing';

import { SEmpleado } from './s-empleado';

describe('SEmpleado', () => {
  let service: SEmpleado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEmpleado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
