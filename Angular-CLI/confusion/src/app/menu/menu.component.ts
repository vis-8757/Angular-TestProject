//menu.comp.ts
import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/Dish';
//import {DISHES} from '../shared/dishes';
//not an ideal way to import DISHES object. Its supposed to be done by a service. 
import {DishService} from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import {flyInOut,expand} from '../app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  //dishes is a variable which is an array of Dish type
  dishes:Dish[];
  //selectedDish:Dish;
//selectedDish=DISHES[0];
errMess:string;
   
  constructor(private dishService:DishService, @Inject('BaseURL') private baseURL) {   }
// for a service we bring it like done for dishService but for a value we have to
// use @Inject like done. baseURL is the value
// check for giving different names in @Inject('') assuming after private its any name. 
  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes)=>this.dishes=dishes,
    varErr=>this.errMess=<any>varErr);
  } // in the 2nd parameter for subscribe, error message is caught. 
    //So varErr fn assigns value of that message in errMess string.

 // onSelect(dish:Dish){
  //  this.selectedDish=dish;}
}