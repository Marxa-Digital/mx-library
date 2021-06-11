import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxSliderCrudComponent } from './mx-slider-crud.component';

describe('MxSliderCrudComponent', () => {
  let component: MxSliderCrudComponent;
  let fixture: ComponentFixture<MxSliderCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxSliderCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxSliderCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
