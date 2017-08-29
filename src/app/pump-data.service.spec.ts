import { TestBed, inject } from '@angular/core/testing';

import { PumpDataService } from './pump-data.service';

describe('PumpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PumpDataService]
    });
  });

  it('should be created', inject([PumpDataService], (service: PumpDataService) => {
    expect(service).toBeTruthy();
  }));
});
