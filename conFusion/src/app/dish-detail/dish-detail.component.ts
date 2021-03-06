import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';


import { baseURL } from '../shared/baseurl';

import { switchMap } from 'rxjs/operators';


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import { visibility,flyInOut,expand } from '../animations/app.animation';



@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {
  

  //@Input()
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment; 
  errMess: any;
  visibility = 'shown';
  
// For Custom Validation Messages
  formErrors = {
    'author': '',
    'comment':''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comments can not be empty',
      'minlength':     'comment must be at least 2 characters long.',
    }
  };




  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,private formBuilder: FormBuilder,
              @Inject('BaseURL') private BaseURL)
     {
      this.commentForm = this.createFormGroupWithBuilder(formBuilder);
      }


    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) =>{ this.visibility='hidden';return this.dishservice.getDish(params['id'])}))
      .subscribe(dish => 
            {  this.dish = dish; this.setPrevNext(dish.id); this.visibility='shown' },
            errmess => this.errMess = <any>errmess );
     

          // Subscribe to the function onValueChanged if there is any cahnge in form 
            this.commentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
      
          this.onValueChanged(); 


               }
  
//Creating form
    createFormGroupWithBuilder(formBuilder: FormBuilder) {
      return formBuilder.group({
          author:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
          rating:5,
          comment:['', [Validators.required,  Validators.minLength(5)] ],
      });
    }


    //Checking for any change in input field in form
    onValueChanged(data?: any) {
      
            if (!this.commentForm) { return; }
      
            const form = this.commentForm;
            
            for (const field in this.formErrors) {
      
                      if (this.formErrors.hasOwnProperty(field)) {
                        
                            this.formErrors[field] = '';
                            const control = form.get(field);
                            if (control && control.dirty && !control.valid) {
                                      const messages = this.validationMessages[field];
                                      for (const key in control.errors) {
                                                  if (control.errors.hasOwnProperty(key)) {
                                                    this.formErrors[field] += messages[key] + ' ';
                                                  }
                                      }
                        }
                      }
            }
          }

    onSubmit() {
      if(this.commentForm.valid)
      {
        this.comment = this.commentForm.value;
        console.log(this.comment);
        this.dish.comments.push(this.comment);
            this.commentForm.reset({
              author: '',
              comment: '',
              rating: 5
            });
            this.dishservice.putDish(this.dish)
            .subscribe(dish => {
              this.dish = dish; 
            },
            errmess => { this.dish = null; this.dish = null; this.errMess = <any>errmess; });
      }
  }



setPrevNext(dishId: string) {
  const index = this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
}

goBack(): void {
this.location.back();
}


  
}
