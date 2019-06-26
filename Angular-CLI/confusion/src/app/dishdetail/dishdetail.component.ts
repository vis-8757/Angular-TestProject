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

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  //@Input()
//not passsing input of Dish anymore
  dish:Dish;
   
  constructor( private location:Location, private route:ActivatedRoute,
    private dishservice:DishService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id).subscribe((dish)=>this.dish=dish);

// so when we click on a dish in menu comp, the routerLink there passes the dish id as parameters
// to the router which then becomes available to dishdetail by accessing the ActivatedRoute 
// service up here.
//  Q: onClick detection how ??  
  }

  comeBack():void {
    this.location.back();
  }
}
