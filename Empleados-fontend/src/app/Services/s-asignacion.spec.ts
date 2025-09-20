import { TestBed } from '@angular/core/testing';

import { SAsignacion } from './s-asignacion';

describe('SAsignacion', () => {
  let service: SAsignacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAsignacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
