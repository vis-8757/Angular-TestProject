import { Component, OnInit, ViewChild } from '@angular/core';
//ViewChild to get access to all child elements in the DOM
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  @ViewChild(FormGroupDirective) ffy:FormGroupDirective ;
  //refering to feedback form by a var fform to get access to it to be able to completely reset it.

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  constructor(private fb:FormBuilder) {
    this.createForm();
   }
//createForm can be defined in the constructior itself but we might need the 
//property elsewhere too so its better to define it separately.

ngOnInit() {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['', Validators.required],
      email: ['', Validators.required],   
      agree: false,
      contacttype: 'None',
      message: ''
    });
//this creates a form that then needs to be mapped into the template code as well

}

onSubmit() {
  this.feedback = this.feedbackForm.value;
  //form model (feedback.ts) is exactly the same as data model (conact.comp.ts file) so 
  //the value of form model is difrectly taken.
  // The feedbackForm gives a property called value, which allows  to retrieve the current value
  // of all these from my feedback form. So this will form a JavaScript object, which  can 
  //then be mapped into the feedback JavaScript object.

  console.log(this.feedback);
  this.feedbackForm.reset({
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contacttype: 'None',
    message: ''
  });
// we put it like the same object as in create form so that it returns to exactly same stata upon submit

this.ffy.resetForm();
}

}
