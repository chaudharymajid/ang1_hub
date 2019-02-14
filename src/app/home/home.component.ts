import { Component } from '@angular/core';
import { UserPreferencesService } from 'src/app/employee/userPreference.service';

@Component({
    templateUrl: 'home.component.html',  
    styleUrls : ['home.component.css']  
})
export class HomeComponent {
    constructor(private _userPreference: UserPreferencesService) {

    }

    get colour(): string {
        return this._userPreference.colourPreference;
    }

    set colour(value: string) {
        this._userPreference.colourPreference = value;
    }

    employees = [
        {code: '101', name: 'Tom', gender: 'Male', annualSalary: 5500, dateOfBirth: '04/25/1984'},
        {code: '102', name: 'Andrew', gender: 'Male', annualSalary: 6500, dateOfBirth: '03/26/1985'},
        {code: '103', name: 'Kate', gender: 'Female', annualSalary: 6000, dateOfBirth: '02/27/1986'},
        {code: '104', name: 'Marry', gender: 'Female', annualSalary: 7000, dateOfBirth: '01/28/1987'}
    ];

}