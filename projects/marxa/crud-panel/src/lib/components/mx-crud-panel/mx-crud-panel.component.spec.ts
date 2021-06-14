import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxCrudPanel } from './mx-crud-panel.component';

describe('MxCrudPanelComponent', () => {
  let component: MxCrudPanel;
  let fixture: ComponentFixture<MxCrudPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxCrudPanel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxCrudPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
