import { TestBed } from '@angular/core/testing';

import { TouristicObjectiveServiceService } from './touristic-objective-service.service';

describe('TouristicObjectiveServiceService', () => {
  let service: TouristicObjectiveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristicObjectiveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
