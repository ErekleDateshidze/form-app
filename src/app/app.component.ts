import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { Gender, Occupation, RegisterForm } from './app.model';
import { emailValidator, forbiddenWordsValidator } from './app.validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  occupation=Occupation;
  gender=Gender;  

  form: FormGroup<RegisterForm> =this.buildForm();

  isSubmitted= false;

  hobbies = ['Hiking' , 'Reading' , 'Gym' , 'Meditation' , 'Yoga' , 'Singing']

  constructor(private fb: FormBuilder) {}

  handleSubmission() {
    this.isSubmitted = true;
    console.log(this.form);
  }

  private buildForm(){
    return new FormGroup<RegisterForm>({
        firstName: new FormControl('', [Validators.required ,  Validators.min(3) , Validators.max(10) ,forbiddenWordsValidator()] ),
        lastName:new FormControl('' ,[Validators.required , Validators.min(3) , Validators.max(20)]),
        hobbies:new FormArray([new FormControl('')]),
        age:new FormControl(null , [Validators.required , Validators.min(10) , Validators.max(30)]),
        email:new FormControl('' , [Validators.required , Validators.email , emailValidator()]),
        occupation:new FormControl(null),
        gender:new FormControl(Gender.Male)
        
    })
  }

  addHobbyControl() {
    console.log('adding hobby')
  }

  ngOnInit(){
    this.form.controls['email'].addAsyncValidators(emailValidator())
  }

}