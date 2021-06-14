import { TestBed } from '@angular/core/testing';

import { MxCrudService } from './mx-crud-panel.service';

describe('CrudPanelService', () => {
  let service: MxCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MxCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
