import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsHandleComponent } from './errors-handle.component';

describe('ErrorsHandleComponent', () => {
  let component: ErrorsHandleComponent;
  let fixture: ComponentFixture<ErrorsHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
