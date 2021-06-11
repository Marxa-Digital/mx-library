import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxSlideEditComponent } from './mx-slide-edit.component';

describe('MxSlideEditComponent', () => {
  let component: MxSlideEditComponent;
  let fixture: ComponentFixture<MxSlideEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxSlideEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxSlideEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
