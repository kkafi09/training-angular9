import { TestBed } from '@angular/core/testing';

import { CheckupdateService } from './checkupdate.service';

describe('CheckupdateService', () => {
  let service: CheckupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
