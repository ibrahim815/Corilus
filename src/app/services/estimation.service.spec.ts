import { TestBed } from '@angular/core/testing';

import { EstimationnService } from './estimationn.service';

describe('EstimationService', () => {
  let service: EstimationnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimationnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
