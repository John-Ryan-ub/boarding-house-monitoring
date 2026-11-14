import { TestBed } from '@angular/core/testing';
import { Tenants } from './tenants';

describe('Tenants', () => {
  let service: Tenants;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tenants);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
