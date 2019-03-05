import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})


export class ContactformComponent implements OnInit {
  

  contactForm: FormGroup;

  countries = ['India','China','Japan','Bhutan'];

  requestTypes = ['Claim', 'Feedback' , 'Help'];

  constructor() { 

      this.contactForm= this.createFormGroup();

  }

  ngOnInit() {
  }

   

     createFormGroup() {
      return new FormGroup({
        personalData: new FormGroup({
          email: new FormControl(),
          mobile: new FormControl(),
          country: new FormControl()
        }),
        requestType: new FormControl(),
        text: new FormControl()
      });
    }
    
  }


