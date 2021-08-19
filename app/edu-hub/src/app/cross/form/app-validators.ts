import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export namespace AppValidators {

    export function compareValue(anotherControl: FormControl): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value || !anotherControl.value) return null;
            return control.value !== anotherControl.value ? {
                compareValue: {
                    value: control.value,
                    destValue: anotherControl.value
                }
            } : null;
        };
    };
}