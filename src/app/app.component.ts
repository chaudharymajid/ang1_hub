import { Component } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'my-app',
  template: `<div style="padding:5px">
  <ul class="nav nav-tabs">
      <li routerLinkActive="active">
          <a routerLink="home">Home</a>
      </li>
      <li routerLinkActive="active">
          <a routerLink="employees">Employees</a>
      </li>
  </ul>
  <br/>
  <router-outlet></router-outlet>
</div>`
  // templateUrl: 'app.component.html'
})
export class AppComponent {
  pageHeader : string = 'Employee Details';
  imagePath : string = 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31'; 

  firstName : string = 'Tommy';
  lastName : string = 'Cat';
  classesToApply : string = 'italicClass boldClass';
  applyBoldClass: boolean = true;

  getFullName() : string {
    return this.firstName + ' ' + this.lastName;
  }

  onClick() : void {
    alert('Button Clicked');
  }
}