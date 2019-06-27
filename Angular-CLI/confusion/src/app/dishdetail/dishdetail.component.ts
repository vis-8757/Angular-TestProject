//dishdetail.comp.ts
import { Component, OnInit } from '@angular/core';
//no longer need Input in imports
//now to receive the parameters info from routers we import Params
//Activated Route provides access to route
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
//to know the location of our page wrt the browser history to go back n forth
import {Dish} from '../shared/Dish';
//import { from } from 'rxjs';
import {DishService} from '../services/dish.service';
//cuz we r no longer getting dishservice from menu comp  so gotta explicitly fetch it from dishservice

import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  //@Input()
//not passsing input of Dish anymore
  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
   
  constructor( private location:Location, private route:ActivatedRoute,
    private dishservice:DishService) { }

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
  this.route.params.pipe(switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
  .subscribe((dish)=>{this.dish=dish; this.setPrevNext(dish.id)});

// when params change value (i.e. when route parameter changes value) the switchMap operator will take this
// value and do a getDish() from the dishservice and that will be available as another OBSERVABLE
// emitted by doing a switchMap operator on the params OBSERVABLE.
// then we subscribe to that getDish() observable.
// so a new observable getDish() has been created which returns an object containing all details of a dish as per it's id.   
  
// prev and next values are also changed with the changing dish id value 
}  
setPrevNext(dishIdv:string){
 const index =this.dishIds.indexOf(dishIdv);
 this.prev= this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
 this.next= this.dishIds[(this.dishIds.length +index +1)% this.dishIds.length];

 // if id is at 0th position in the dishIds array then prev= the nth element in dishIds
 // if id is at nth position in the dishIds array then next= the 0th element in dishIds
}

  comeBack():void {
    this.location.back();
  }
}
