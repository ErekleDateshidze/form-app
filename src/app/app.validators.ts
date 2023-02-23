import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";

const unsafeWords = ['cudisityva1' ,  'cudisityva2' ,'cudisityva3']

export function forbiddenWordsValidator():ValidatorFn {
  return( control:AbstractControl) : ValidationErrors |null => {
    const isUnsafeWord = unsafeWords.includes(control.value);
    return isUnsafeWord ? { isUnsafe : control.value} :null
  }
}



export function emailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const apiService = new ApiService();
    return apiService.checkUsedEmail(control.value).pipe(
      map((isUsed) => {
        return isUsed ? { isUsed } : null;
      })
    );
  };
}

const alreadyUsedEmails = [
    'bazera@gmail.com',
     'kote@gmail.com',
      'berura@gmail.com'
]

export class ApiService {
    checkUsedEmail(email:string) : Observable<boolean> {
        return new Observable ((observer) => {
            if( alreadyUsedEmails.includes(email)) {
                observer.next(true)
            } else {
                observer.next(false)
            }
            observer.complete();
        })
    }
}