import { Component } from '@angular/core';
import { signIn } from 'src/app/models/signIn.model';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import { EmployeeService } from '../providers/employee.service'
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [EmployeeService]
})
export class UserComponent {

  loginForm: FormGroup;
  error: boolean = false;
  fd: signIn = {
    email: null,
    password: null
  }

  constructor(private http: Http, private fb: FormBuilder, private empserv: EmployeeService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

 onSubmit() {

    let userEmail: string;
    let userId: string;
    const sessionExp = new Date(0);
    let userToken: string;
    let jwtToken: any;
    let jwtTokenDecoded: any;    

    this.fd.email = this.loginForm.value.email;
    this.fd.password = this.loginForm.value.password;

    this.empserv.logIn(this.fd).subscribe((Response) => {
      jwtToken = Response;
      jwtTokenDecoded = jwt_decode(jwtToken.token);

      userEmail = jwtTokenDecoded.email;
      userId = jwtTokenDecoded.userId;
      sessionExp.setUTCSeconds(jwtTokenDecoded.exp);
      jwtToken = jwtToken.token;
      //userToken = JSON.stringify(jwtToken.token.json().token).replace(/['"]+/g, '');

      sessionStorage.setItem('userToken', jwtToken);
      sessionStorage.setItem('userEmail', userEmail);
      sessionStorage.setItem('userId', userId);
      this.router.navigateByUrl('/home');
    }, (err) => {
      this.error = true;
    });    
  }

  logOff() {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
  }

  handleError(error: Response) {
    console.error(error);
    return ErrorObservable.create(error);
  }

}
