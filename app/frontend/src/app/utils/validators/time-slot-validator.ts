import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const timeSlotValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');

  return startTime && endTime && startTime?.value > endTime?.value
    ? { timeError: true }
    : null;
};
