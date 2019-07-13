//dishdetail.comp.ts
import { Component, OnInit,ViewChild, createPlatformFactory, Inject } from '@angular/core';
//no longer need Input in imports
//now to receive the parameters info from routers we import Params
//Activated Route provides access to route
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
//to know the location of our page wrt the browser history to go back n forth
import {Dish} from '../shared/Dish';
import {DISHES} from '../shared/dishes';
//import { from } from 'rxjs';
import {DishService} from '../services/dish.service';
//cuz we r no longer getting dishservice from menu comp  so gotta explicitly fetch it from dishservice

import {switchMap} from 'rxjs/operators';
import {Comment} from '../shared/comment';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility',[
      state('shown',style({
        transform:'scale(1)',
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('*=>*',animate("0.5s ease-in-out"))
    ])
  ]
})

export class DishdetailComponent implements OnInit {
  //@Input()
//not passsing input of Dish anymore
  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess:string;
  dishcopy:Dish;
  visibility='shown';
  
  @ViewChild(FormGroupDirective) customFeed:FormGroupDirective;

cusfeedform:FormGroup;
//com:Comment;
formError={
  'author': '',
  'comment':''
};

validationMessage={
  'author':{
    'required': 'Author name is required',
    'minlength':'Author name must be at least 2 characters long',
    'maxlength':'Author name cannot be more than 25 characters'
  },
  'comment':{
    'required': 'Comment is required',
    'minlength': 'comment cant be less than 3 characters long'
  }
};
   
  constructor( private location:Location, private route:ActivatedRoute,
    private dishservice:DishService, private buildForm:FormBuilder, @Inject('BaseURL') private baseURL) {
      this.makeForm();
     }

  ngOnInit() {
   //code// let id = this.route.snapshot.params['id'];
 //  params is an observable too, suppplied by the ActiavtedRoute service
// by snapshot, a snapshot of the param value is taken. But this is not ideal way to do things.

  //code// this.dishservice.getDish(id).subscribe((dish)=>this.dish=dish);

// so when we click on a dish in menu comp, the routerLink there passes the dish id as parameters
// to the router which then becomes available to dishdetail by accessing the ActivatedRoute 
// service up here.
//  Q: onClick detection how ??

  this.dishservice.getDishIds().subscribe(dishIds=>this.dishIds=dishIds);
  this.route.params.pipe(switchMap((params:Params)=>{this.visibility='hidden'; 
  return this.dishservice.getDish(params['id'])}))
  .subscribe((dish)=>{this.dish=dish; this.dishcopy=dish; this.setPrevNext(dish.id);this.visibility='shown'}, 
  varErr=>this.errMess=<any>varErr);

// when params change value (i.e. when route parameter changes value) the switchMap operator will take this
// value and do a getDish() from the dishservice and that will be available as another OBSERVABLE
// emitted by doing a switchMap operator on the params OBSERVABLE.
// then we subscribe to that getDish() observable.
// so a new observable getDish() has been created which returns an object containing all details of a dish as per it's id.   
  
// prev and next values are also changed with the changing dish id value 

//this.testObject=this.cusfeedform.value;
}  

makeForm(){
  this.cusfeedform=this.buildForm.group({
    author:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    comment:['', [Validators.required, Validators.minLength(2)]],
    rating :['5']
  });
 
this.cusfeedform.valueChanges.subscribe((datum)=>this.uponChangedValue(datum));
this.uponChangedValue(); 
//this.cusfeedform.valueChanges.subscribe((datum)=>this.showd(datum));
//this.showd();
}

//showd(datum?:any){
 // if (this.cusfeedform){
 //   var aye=[1];}; }

uponChangedValue(datum?:any){

  if(!this.cusfeedform) {return;};
 // const feedVar=this.cusfeedform;
  for (const field in this.formError){
    if(this.formError.hasOwnProperty(field)){
      this.formError[field]='';
      const myControl=this.cusfeedform.get(field);
      if(myControl && myControl.dirty && myControl.invalid){
        const throwbackMsg=this.validationMessage[field];
        for(const k in myControl.errors){
          if(myControl.errors.hasOwnProperty(k)){
            this.formError[field] += throwbackMsg[k];
          }
        }
      }
    }
  }
}

setPrevNext(dishIdv:string){
 const index =this.dishIds.indexOf(dishIdv);
 this.prev= this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
 this.next= this.dishIds[(this.dishIds.length +index +1)% this.dishIds.length];

 // if id is at 0th position in the dishIds array then prev= the nth element in dishIds
 // if id is at nth position in the dishIds array then next= the 0th element in dishIds
}

onSubmit(){
  const b={
    rating:this.cusfeedform.controls.rating.value,
    comment:this.cusfeedform.controls.comment.value,
    author: this.cusfeedform.controls.author.value,
    date: new Date().toISOString()
   }
 //DISHES[this.dish.id].comments.push(b);

 this.dishcopy.comments.push(b);
 this.dishservice.putDish(this.dishcopy).subscribe(newDishData=>{this.dish=newDishData;
  this.dishcopy=newDishData}, varErr=>{this.dish=null; this.dishcopy=null;
    this.errMess=<any>varErr});
//here we are updating the original dish with newDishData from server after 
//the server replies back with its updated data.

 console.log(this.cusfeedform.controls.rating.value, this.cusfeedform.controls.comment.value);

  this.cusfeedform.reset({
    author:'',
    comment:'',
    rating:''
  })
  this.customFeed.resetForm();
}

  comeBack():void {
    this.location.back();
  }
}
