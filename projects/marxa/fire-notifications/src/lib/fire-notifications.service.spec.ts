import { TestBed } from '@angular/core/testing';

import { FireNotificationsService } from './fire-notifications.service';

describe('FireNotificationsService', () => {
  let service: FireNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
