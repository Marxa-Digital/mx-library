import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxLoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: MxLoadingComponent;
  let fixture: ComponentFixture<MxLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
