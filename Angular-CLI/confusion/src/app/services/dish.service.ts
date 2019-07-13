import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
//import {DISHES} from '../shared/dishes';
// no longer need to get value like this cux now we use json server for that.
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {of, from, Observable} from 'rxjs';
import {delay,map,catchError} from 'rxjs/operators';
import { resolveTimingValue } from '@angular/animations/browser/src/util';
//observables return stream of data so if converted to promises they'll return only one vaulue
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient, private proc:ProcessHTTPMsgService) { }

  getDishes():Observable<Dish[]>{ 
     //the Dish[] is promised and the value DISHES returned when the promise resolves

   // return new Promise(resolve => {setTimeout(()=>resolve(DISHES), 2000)});
    //2 sec time delay
   
    // return of (DISHES).pipe(delay(2000)).toPromise();

    //of returns only one value from the observable that is specified. [.toPromise too ?]
    //that value is converted to promise and is returned as a promise.
    //now getDishes method makes use of observable & convert that to a promise and sends that to the component 
  //---------------------------------------
   // return of (DISHES).pipe(delay(2000));
   // we are ditching the observable method above to fetch data from json server
   return this.http.get<Dish[]>(baseURL+'dishes').pipe(catchError(this.proc.handleError));
  }
 

  getDish(id: string): Observable<Dish> {
   // return new  Promise(resolve=>{setTimeout( () =>resolve(DISHES.filter((Dish)=>(Dish.id===id))[0]),2000)});
   
   //return of (DISHES.filter((Dish)=>(Dish.id===id))[0]).pipe(delay(2000));
   return this.http.get<Dish>(baseURL+'dishes/'+id).pipe(catchError(this.proc.handleError));
  }
//check foutputs for dish.id and Dish.id****  change observable to dish n CHECK ****

  getFeaturedDish(): Observable<Dish> {
    //return Promise.resolve(DISHES.filter((Dish) => Dish.featured)[0])

   // return new Promise(resolve=>{setTimeout(()=> resolve(DISHES.filter((Dish) => Dish.featured)[0]),2000)});

  // return of (DISHES.filter((Dish) => Dish.featured)[0]).pipe(delay(2000)).toPromise();

 //--> return of (DISHES.filter((Dish) => Dish.featured)[0]).pipe(delay(2000));
 //promises and observables can return the same thing.
 return this.http.get<Dish[]>(baseURL+'dishes?featured=true').pipe(map(dishes=>dishes[0]))
 .pipe(catchError(this.proc.handleError));
}
getDishIds():Observable<string [] | any> {
 // return of (DISHES.map(Dish=>Dish.id));
  //check for difffernt name at first dish
  return this.getDishes().pipe(map(dishes=>dishes.map(Dish=>Dish.id))).pipe(catchError(error=>error));
  //cuz this is taking from getDishes() which is already covering for errors
  // so no catchError here. Error catching wont come to this point. 
}
putDish(dish:Dish):Observable<Dish>{
  //the modified Dish is being sentback from the server as an observable 
const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
// we are specifying to our server that the incoming request message contains 
//the information in the form of a json object in the body of the incoming request message.
//So, the server will be able to extract the Dish information from the body of the message, 
//parse it, and then be able to persist the modified Dish to the server, and then 
//send back the updated Dish information from the server side.
};
return this.http.put<Dish>(baseURL+'dishes/'+dish.id,dish, httpOptions).pipe(
  catchError(this.proc.handleError));
}
//in put() 1st argument is for url 2nd for body and 3rd for options
}


