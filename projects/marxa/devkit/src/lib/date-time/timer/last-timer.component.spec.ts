import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxLastTimerComponent } from './last-timer.component';

describe('TimerComponent', () => {
  let component: MxLastTimerComponent;
  let fixture: ComponentFixture<MxLastTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxLastTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MxLastTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
