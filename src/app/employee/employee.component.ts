import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeeService } from '../providers/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPreferencesService } from './userPreference.service';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import {  } from 'src/app/setup/compsetup.component';


@Component({
    selector: 'employee',
    templateUrl: 'emp.comp.html',
    styleUrls: ['emp.comp.css']
})
export class EmployeeComponent implements OnInit {
    employee: IEmployee;
    statusMessage: string = 'Loading data. Please wait...';
    subscription : ISubscription;

    constructor(private _employeeService: EmployeeService,
                private _activatedRoute: ActivatedRoute,
                private _userPreference : UserPreferencesService,
                private _backRoute: Router) { }

    onBackButtonClick(): void {
        this._backRoute.navigate(['/employees']);
    }

    onCancelButtonClick(): void {
        this.statusMessage = 'Request cancelled';
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        let empCode: number = this._activatedRoute.snapshot.params['code'];
        this.subscription = this._employeeService.getEmployeeByCode(empCode)
        .retryWhen((err) => {
            return err.scan((retryCount, val) => {
                retryCount += 1;
                if (retryCount < 6) {
                    this.statusMessage = 'Retrying...Attempt #' + retryCount;
                    return retryCount;
                }
                else {
                    throw (err);
                }
            }, 0).delay(1000)
        })         
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