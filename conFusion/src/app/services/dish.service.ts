import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

//Observables
import {Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Injectable({

  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient, private processHTTPMsgService : ProcessHTTPMsgService) { }
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
  return this.http.get<Dish[]>(baseURL + 'dishes')
  .pipe(catchError(this.processHTTPMsgService.handleError));
}

getDish(id: string): Observable<Dish> {
  return this.http.get<Dish>(baseURL + 'dishes/' + id)
  .pipe(catchError(this.processHTTPMsgService.handleError));
}


getFeaturedDish(): Observable<Dish> {
  return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
  .pipe(catchError(this.processHTTPMsgService.handleError));
}


getDishIds(): Observable<string[] | any> {
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  .pipe(catchError(error => error));
}



}
