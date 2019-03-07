import { Component, OnInit, Inject } from '@angular/core';
//importing dish.ts for using Dish variable
import { Dish } from '../shared/dish';
import { DishService } from 'src/app/services/dish.service';
//import { DISHES } from '../shared/dishes';



//now we will use services

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {



  dishes: Dish[];// = DISHES;
  errMess: string;


 // selectedDish: Dish;
  

  constructor(private dishService: DishService, 
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
    errmess => this.errMess = <any>errmess) ;
  }

  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  //}

}
