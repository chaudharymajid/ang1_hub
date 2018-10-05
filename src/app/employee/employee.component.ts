import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPreferencesService } from './userPreference.service';

@Component({
    selector: 'employee',
    templateUrl: 'emp.comp.html',
    styleUrls: ['emp.comp.css']
})
export class EmployeeComponent implements OnInit {
    employee: IEmployee;
    statusMessage: string = 'Loading data. Please wait...';

    constructor(private _employeeService: EmployeeService,
                private _activatedRoute: ActivatedRoute,
                private _userPreference : UserPreferencesService,
                private _backRoute: Router) { }

    onBackButtonClick(): void {
        this._backRoute.navigate(['/employees']);
    }

    ngOnInit() {
        let empCode: number = this._activatedRoute.snapshot.params['code'];
        this._employeeService.getEmployeeByCode(empCode)
            .subscribe((employeeData) => {
                if (employeeData == null) {
                    this.statusMessage =
                        'Employee with the specified Employee Code does not exist';
                }
                else {
                    this.employee = employeeData;
                }
            },
            (error) => {
                this.statusMessage =
                    'Problem with the service. Please try again after sometime';
                console.error(error);
            });
    }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'employee',
//   templateUrl: 'emp.comp.html',
//   styleUrls: ['emp.comp.css' ]
// })
// export class EmployeeComponent {
//   firstName : string = 'Tom';
//   lastName : string = 'Hopkins';
//   gender : string = 'Male';
//   age : number = 30;
//   showDetails : boolean = false;
  
//   columnSpan : number = 2;

//   toggleDetails(): void {
//     this.showDetails = !this.showDetails;
//   }

// }
