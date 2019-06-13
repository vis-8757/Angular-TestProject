//menu.comp.ts
import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/Dish';
//import {DISHES} from '../shared/dishes';
//not an ideal way to import DISHES object. Its supposed to be done by a service. 
import {DishService} from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  //dishes is a variable which is an array of Dish type
  dishes:Dish[];
  selectedDish:Dish;

  //selectedDish=DISHES[0];
   
  constructor(private dishService:DishService) {   }

  ngOnInit() {
    this.dishes=this.dishService.getDishes();
  }

  onSelect(dish:Dish){
    this.selectedDish=dish;
  }
}