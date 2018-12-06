import { Component, OnInit } from '@angular/core';
import { signIn } from 'src/app/models/signIn.model';
import { userReg } from 'src/app/models/userReg.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  signin: signIn = {
    email: null,
    password: null
  }

  ngOnInit() {
  }

}
