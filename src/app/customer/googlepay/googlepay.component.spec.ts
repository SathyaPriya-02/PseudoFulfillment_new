import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglepayComponent } from './googlepay.component';

describe('GooglepayComponent', () => {
  let component: GooglepayComponent;
  let fixture: ComponentFixture<GooglepayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GooglepayComponent]
    });
    fixture = TestBed.createComponent(GooglepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
