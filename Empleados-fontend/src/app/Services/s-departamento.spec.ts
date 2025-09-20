import { TestBed } from '@angular/core/testing';

import { SDepartamento } from './s-departamento';

describe('SDepartamento', () => {
  let service: SDepartamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDepartamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
