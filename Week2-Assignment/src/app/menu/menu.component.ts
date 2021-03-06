import { Component, OnInit } from '@angular/core';
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



  selectedDish: Dish;
  

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }

  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  //}

}
