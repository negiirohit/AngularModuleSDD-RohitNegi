import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({

  providedIn: 'root'
})
export class DishService {

  constructor() { }
//to provide array of dishes as a service to dependent componennt
  getDishes(): Dish[] {
    return DISHES;
  }


}
