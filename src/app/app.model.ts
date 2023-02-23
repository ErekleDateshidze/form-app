import { FormArray, FormControl } from "@angular/forms";

export enum Occupation {
  Developer = 'developer',
  Manager= 'manager',
  Tester= 'Tester'
}

export enum Gender {
  Male= 'Male',
  Female= 'Female'
}

export interface RegisterForm {
  firstName: FormControl<string | null>;
  lastName:FormControl<string | null>;
  hobbies?:FormArray<FormControl<string | null> >;
  age:FormControl<number |  null> ;
  email:FormControl<string | null>;
  occupation?:FormControl<Occupation | null> ;
  gender:FormControl<Gender | null>;
}
