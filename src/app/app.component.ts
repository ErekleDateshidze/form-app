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

  
  get plusButtonDisabled () {
   return this.form.controls.hobbies?.length === 5;     
  }

  get  removeButtonDisabled() {
    return this.form.controls.hobbies?.length === 2;
  }

  hobbies = ['Hiking' , 'Reading' , 'Gym' , 'Meditation' , 'Yoga' , 'Singing']

  constructor(private fb: FormBuilder) {}

  handleSubmission() {
    this.isSubmitted = true;
    console.log(this.form);
  }

  private buildForm(){
    return this.fb.group<RegisterForm>({
        firstName: this.fb.control('', [Validators.required ,  Validators.min(3) , Validators.max(10) ,forbiddenWordsValidator()] ),
        lastName:this.fb.control('' ,[Validators.required , Validators.min(3) , Validators.max(20)]),
        hobbies:this.fb.array([this.fb.control('')]),
        age:this.fb.control(null , [Validators.required , Validators.min(10) , Validators.max(30)]),
        email:this.fb.control('' , [Validators.required , Validators.email , emailValidator()]),
        occupation:this.fb.control(null),
        gender:this.fb.control(Gender.Male)
        
    })
  }

  addHobbyControl() {
    if(this.form.controls.hobbies?.length === 5) {
      return
    }
    
    
    const hobbies = this.form.controls.hobbies;
    hobbies?.push(this.fb.control(''));
  }

    
 removeHobbyControl(index : number) {
    const hobbies = this.form.controls.hobbies;
    hobbies?.removeAt(index);
  }

  ngOnInit(){
    this.form.controls['email'].addAsyncValidators(emailValidator());
    this.form.valueChanges.subscribe((x) => console.log(x))
  }

}