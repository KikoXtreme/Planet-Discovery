import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null
    }
    if (!/.{6,}@gmail\.(bg|com)$/.test(value)) {
        return {
            email: true,
        }
    }
    return null;
}

export function passwordMatch(passwordFormControl: AbstractControl) {
    const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }
        return null;
    }
    return validtorFn;
}
// export function passwordMatch(passwordFormControl: AbstractControl): ValidationErrors | null {
//     const passwordGroup = passwordFormControl.parent as FormGroup;

//     if (!passwordGroup) {
//         return null;
//     }

//     const { password, repass } = passwordGroup.controls;
//     if (password.value !== repass.value) {
//         return {
//             passwordMatch: true
//             // passwordMissmatch
//         }
//     }
//     return null;
// }