import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import {DISHES} from '../shared/dishes';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Dish[]{ 
    return DISHES;
  }
  getDish(id: string): Dish {
    return DISHES.filter((Dish)=>(Dish.id===id))[0];
  }
//check foutputs for dish.id and Dish.id
  getFeaturedDish(): Dish {
    return DISHES.filter((Dish) => Dish.featured)[0];}

}
