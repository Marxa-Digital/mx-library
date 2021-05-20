import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireNotificationsComponent } from './fire-notifications.component';

describe('FireNotificationsComponent', () => {
  let component: FireNotificationsComponent;
  let fixture: ComponentFixture<FireNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
