import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

//Observables
import {Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({

  providedIn: 'root'
})
export class DishService {

  constructor() { }
//to provide array of dishes as a service to dependent componennt
// getDishes(): Promise<Dish[]> {
//   return Promise.resolve(DISHES);
// }

// getDish(id: number): Promise<Dish> {
//   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
// }

// getFeaturedDish(): Promise<Dish> {
//   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
// }
  
//Promises
// getDishes(): Promise<Dish[]> {
//   return new Promise(resolve=> {
//     // Simulate server latency with 2 second delay
//       setTimeout(() => resolve(DISHES), 8000);
//   });
// }

// getDish(id: string): Promise<Dish> {
//   return new Promise(resolve=> {
//     // Simulate server latency with 2 second delay
//       setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 8000);
//   });
// }

// getFeaturedDish(): Promise<Dish> {
//   return  new Promise(resolve=> {
//     // Simulate server latency with 2 second delay
//       setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 8000);
//   });
// }


//Observeables
getDishes(): Observable<Dish[]> {
  return of(DISHES).pipe(delay(2000));
}

getDish(id: string): Observable<Dish> {
  return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
}

getFeaturedDish(): Observable<Dish> {
  return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
}


getDishIds(): Observable<string[] | any> {
  return of(DISHES.map(dish => dish.id ));
}



}
