import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null
    }
    if (!/.{6,}@(gmail|yahoo|abv)\.(bg|com)$/.test(value)) {
        return {
            email: true,
        }
    }
    return null;
}

export function passMatch(passFormControl: AbstractControl) {
    const validatorFn: ValidatorFn = (repassFormControl: AbstractControl) => {
        if (passFormControl.value !== repassFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }
        return null;
    }
    return validatorFn;
}