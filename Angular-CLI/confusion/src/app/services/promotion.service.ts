import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {of, from, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions(): Observable<Promotion[]> {
    return of (PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Promotion {
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }
//check output for different names at place of promo
 
  getFeaturedPromotion(): Observable<Promotion> {
   return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  
}
