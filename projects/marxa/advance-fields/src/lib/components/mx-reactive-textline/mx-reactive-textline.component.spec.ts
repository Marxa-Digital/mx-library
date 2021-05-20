import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxReactiveTextlineComponent } from './mx-reactive-textline.component';

describe('GdevReactiveTextlineComponent', () => {
  let component: MxReactiveTextlineComponent;
  let fixture: ComponentFixture<MxReactiveTextlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxReactiveTextlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxReactiveTextlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
