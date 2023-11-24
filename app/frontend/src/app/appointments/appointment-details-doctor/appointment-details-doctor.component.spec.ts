import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailsDoctorComponent } from './appointment-details-doctor.component';

describe('AppointmentDetailsDoctorComponent', () => {
  let component: AppointmentDetailsDoctorComponent;
  let fixture: ComponentFixture<AppointmentDetailsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailsDoctorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
