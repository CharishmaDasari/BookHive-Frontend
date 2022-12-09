//found online
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static confirmPasswords(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if((password !== null && confirmPassword !== null) && (password == confirmPassword)){
            return null;
        }else{
            return{
                 passwordsNotMatching : true
            };
        }
    }
}
