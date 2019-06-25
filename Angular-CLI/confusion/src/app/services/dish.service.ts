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

  getDishes():Promise<Dish[]>{ 
    return new Promise(resolve => {setTimeout(()=>resolve(DISHES), 2000)});
    //2 sec time delay
  }
  //the Dish[] is promised and the value DISHES returned when the promise resolves

  getDish(id: string): Promise<Dish> {
    return new  Promise(resolve=>{setTimeout( () =>resolve(DISHES.filter((Dish)=>(Dish.id===id))[0]),2000)});
  }
//check foutputs for dish.id and Dish.id

  getFeaturedDish(): Promise<Dish> {
    //return Promise.resolve(DISHES.filter((Dish) => Dish.featured)[0])

    return new Promise(resolve=>{setTimeout(()=> resolve(DISHES.filter((Dish) => Dish.featured)[0]),2000)});

}
}
