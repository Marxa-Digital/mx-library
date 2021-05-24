import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorColumnsRequiredComponent } from './error-columns-required.component';

describe('ErrorColumnsRequiredComponent', () => {
  let component: ErrorColumnsRequiredComponent;
  let fixture: ComponentFixture<ErrorColumnsRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorColumnsRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorColumnsRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
