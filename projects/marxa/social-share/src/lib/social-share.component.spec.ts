import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxSocialShareComponent } from './social-share.component';

describe('SocialShareComponent', () => {
  let component: MxSocialShareComponent;
  let fixture: ComponentFixture<MxSocialShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxSocialShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxSocialShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
