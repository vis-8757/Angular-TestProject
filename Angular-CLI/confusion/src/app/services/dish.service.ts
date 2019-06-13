import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import {DISHES} from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Dish[]{
    return DISHES;
  }
  getDish(id: string): Dish {
    return Dish[0];
  }
//check foutputs for dish.id and Dish.id
  getFeaturedDish(): Dish {
    return DISHES.filter((Dish) => Dish.featured)[0];
  }

}
