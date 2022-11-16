import { TestBed } from '@angular/core/testing';

import { TechGuardGuard } from './tech-guard.guard';

describe('TechGuardGuard', () => {
  let guard: TechGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TechGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
