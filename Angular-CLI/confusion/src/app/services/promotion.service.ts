import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {of, from, Observable} from 'rxjs';
import {delay, catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
//import {HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpc:HttpClient, private proc:ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.httpc.get<Promotion[]>(baseURL+'promotions').pipe(delay(2000), catchError(this.proc.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
   // return PROMOTIONS.filter((promo) => (promo.id === id))[0];
   return this.httpc.get<Promotion>(baseURL+'promotions').pipe(catchError(this.proc.handleError));
  }
//check output for different names at place of promo :> doesnt matter
 
  getFeaturedPromotion(): Observable<Promotion> {
    return this.httpc.get<Promotion[]>(baseURL+'promotions?featured=true').pipe(map(Promot=>Promot[0]))
    .pipe(catchError(this.proc.handleError));
   //return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  
}
