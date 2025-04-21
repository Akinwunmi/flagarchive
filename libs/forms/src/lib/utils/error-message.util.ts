import { AbstractControl, FormGroup } from '@angular/forms';

export function getErrorMessage(control: AbstractControl | null, form?: FormGroup): string {
  if (control === null || control?.untouched) {
    return '';
  }

  const listOfControls = Object.keys(control.parent?.controls ?? []);
  const name = listOfControls.find((key) => control.parent?.get(key) === control);
  const errors = control?.errors;
  if (form?.hasError('passwordsMismatch')) {
    return 'errors.confirm-password.mismatch';
  }
  if (errors?.['required']) {
    return `errors.${convertToSnakeCase(name ?? '')}.required`;
  }
  if (errors?.['email']) {
    return 'errors.email.invalid';
  }
  if (errors?.['minlength']) {
    return `errors.${convertToSnakeCase(name ?? '')}.min-length`;
  }

  return '';
}

function convertToSnakeCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
