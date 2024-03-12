import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsPatientComponent } from './appointment-details-patient.component';

describe('AppointmentDetailsPatientComponent', () => {
  let component: AppointmentDetailsPatientComponent;
  let fixture: ComponentFixture<AppointmentDetailsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailsPatientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
