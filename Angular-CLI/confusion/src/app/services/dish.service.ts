import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import {DISHES} from '../shared/dishes';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {of, from, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
//observables return stream of data so if converted to promises they'll return only one vaulue

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes():Observable<Dish[]>{ 
     //the Dish[] is promised and the value DISHES returned when the promise resolves

   // return new Promise(resolve => {setTimeout(()=>resolve(DISHES), 2000)});
    //2 sec time delay
   
    // return of (DISHES).pipe(delay(2000)).toPromise();

    //of returns only one value from the observable that is specified. [.toPromise too ?]
    //that value is converted to promise and is returned as a promise.
    //now getDishes method makes use of observable & convert that to a promise and sends that to the component 
  
    return of (DISHES).pipe(delay(2000));
  }
 

  getDish(id: string): Observable<Dish> {
   // return new  Promise(resolve=>{setTimeout( () =>resolve(DISHES.filter((Dish)=>(Dish.id===id))[0]),2000)});
   
   return of (DISHES.filter((Dish)=>(Dish.id===id))[0]).pipe(delay(2000));
  }
//check foutputs for dish.id and Dish.id****  change observable to dish n CHECK ****

  getFeaturedDish(): Observable<Dish> {
    //return Promise.resolve(DISHES.filter((Dish) => Dish.featured)[0])

   // return new Promise(resolve=>{setTimeout(()=> resolve(DISHES.filter((Dish) => Dish.featured)[0]),2000)});

  // return of (DISHES.filter((Dish) => Dish.featured)[0]).pipe(delay(2000)).toPromise();

  return of (DISHES.filter((Dish) => Dish.featured)[0]).pipe(delay(2000));

  //promises and observables can return the same thing.
}
getDishIds():Observable<string [] | any> {
  return of (DISHES.map(Dish=>Dish.id));
  //check for difffernt name at first dish 
}
}


