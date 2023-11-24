import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointDetailsPatientComponent } from './appoint-details-patient.component';

describe('AppointDetailsPatientComponent', () => {
  let component: AppointDetailsPatientComponent;
  let fixture: ComponentFixture<AppointDetailsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointDetailsPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointDetailsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
