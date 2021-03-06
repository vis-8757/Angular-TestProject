import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/Dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { baseURL } from '../shared/baseurl';
import {flyInOut,expand} from '../app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  fLeader:Leader;
  dishErrMess:string;
  promoErrMess:string;
  leadErrMess:string;
  //need to put vars for errors from  promoservice n leadersevice too.

  constructor(private dishService: DishService, private promotionService:PromotionService,
     private fLeaderService:LeaderService, @Inject('BaseURL') private baseURL) {}

  ngOnInit() {
   // this.dish=this.dishService.getFeaturedDish();
   this.dishService.getFeaturedDish().subscribe((dish)=>this.dish=dish, varErr=>this.dishErrMess=<any>varErr);
    this.promotionService.getFeaturedPromotion().subscribe((promotion)=>this.promotion=promotion,
    varErr=>this.promoErrMess=<any>varErr);
   
    // this.fLeaderService.getFeaturedLeader().then((fLeader)=>this.fLeader=fLeader);
    this.fLeaderService.getFeaturedLeader().subscribe(output=>this.fLeader=output, varErr=>this.leadErrMess=<any>varErr);
  }

}
