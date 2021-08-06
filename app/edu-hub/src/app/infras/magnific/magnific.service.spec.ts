import { TestBed } from '@angular/core/testing';

import { MagnificService } from './magnific.service';

describe('MagnificService', () => {
  let service: MagnificService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagnificService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
