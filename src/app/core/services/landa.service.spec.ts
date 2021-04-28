import { TestBed } from '@angular/core/testing';

import { LandaService } from './landa.service';

describe('LandaService', () => {
  let service: LandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
