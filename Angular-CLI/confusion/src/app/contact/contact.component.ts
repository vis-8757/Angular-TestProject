import { Component, OnInit, ViewChild } from '@angular/core';
//ViewChild to get access to all child elements in the DOM
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {FeedbackServiceService} from '../services/feedback-service.service';
import {Params, ActivatedRoute} from '@angular/router';
//import {RouterModule, Routes} from '@angular/router';
import {Router} from '@angular/router';
import {flyInOut,expand,visibility} from '../app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  }
})

export class ContactComponent implements OnInit {

  @ViewChild(FormGroupDirective) ffy:FormGroupDirective ;
  //refering to feedback form by a var ffy to get access to it to be able to completely reset it.

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackFormCopy:Feedback;
  testFeed:Feedback;
  myVar:any;
  errMess:string;
  abc:string;
  contactType = ContactType;
  boolSubmit:boolean;
  boolSubmit2:boolean;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    }
  };

  constructor(private fb:FormBuilder, private feedserv:FeedbackServiceService, private router1:Router,
   private route:ActivatedRoute ) {
    this.createForm();
   }
//createForm can be defined in the constructior itself but we might need the 
//property elsewhere too so its better to define it separately.

ngOnInit() {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],   
      agree: false,
      contacttype: 'None',
      message: ''
    });
//this creates a form that then needs to be mapped into the template code as well

this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
//since valueChanges is an observable that emits an event everytime the value is changed. 
//so we subscribe to it. And do the onValueChanged() function to respond. 

this.onValueChanged();  //resets form data
}

onValueChanged(data?:any){
  if(!this.feedbackForm){return;};
  const form=this.feedbackForm;
  for (const field in this.formErrors){
    if(this.formErrors.hasOwnProperty(field)) {
      // clear previous message if any already there in the formErrors
      // field means it'will check all 4 property of formErrors (which is like the same in actual Form) 
      
      this.formErrors[field]=''; 
      const control= form.get(field);
      if(control && control.dirty && control.invalid) {
        const messages= this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';

      }
    }
  } 
   }
}
}


clearForm(){
  //this.feedback = this.feedbackForm.value;
  //form model (feedback.ts) is exactly the same as data model (conact.comp.ts file) so 
  //the value of form model is directly taken.
  // The feedbackForm gives a property called value, which allows  to retrieve the current value
  // of all these from my feedback form. So this will form a JavaScript object, which  can 
  //then be mapped into the feedback JavaScript object.
  console.log(this.feedbackForm.value,this.feedbackFormCopy.firstname)// this.testFeed.firstname,this.abc);
  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
// we put it like the same object as in create form so that it returns to exactly same state upon submit

this.ffy.resetForm();
this.boolSubmit=false;
}
navigateToContactUs(){
  this.router1.navigate (['../contactus'],{relativeTo:this.route});
}

/** myFunc(){
  if(this.testFeed){
    this.myVar=setTimeout(this.clearForm,5000);
 } }

//getValues(){
//this.feedserv.returnFirstName(this.abc).subscribe(firName=>{this.abc=firName},varErr=>this.errMess=<any>varErr);}
**/
onSubmit() {

  this.feedbackFormCopy={
    firstname:this.feedbackForm.controls.firstname.value,
    lastname:this.feedbackForm.controls.lastname.value,
    telnum:this.feedbackForm.controls.telnum.value,
    email:this.feedbackForm.controls.email.value,
    agree:this.feedbackForm.controls.agree.value,
    contacttype:this.feedbackForm.controls.contacttype.value,
    message:this.feedbackForm.controls.message.value
  }
  this.boolSubmit=true;
  this.feedserv.submitFeedback(this.feedbackFormCopy).subscribe((newData=>{this.testFeed=newData;
    setTimeout(this.navigateToContactUs,5000); }),
  (  varErr: any)=>{this.testFeed=null; this.errMess=<any>varErr});
  this.boolSubmit2=true;

}

}

//The Aim is to not clear form data upon onSubmit() so as to be able to display it afterwards.
//Rather navigate to contactUs page afresh, 5secs after displaying sunmitted information.