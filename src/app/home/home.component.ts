import { Component } from '@angular/core';
import { UserPreferencesService } from 'src/app/employee/userPreference.service';

@Component({
    templateUrl: 'home.component.html'
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
}