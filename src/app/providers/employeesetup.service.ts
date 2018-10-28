import { Injectable } from '@angular/core';
import { IEmployee } from '../employee/employee';
import { Http, Response } from '@angular/http';
import { Observable, Subject, observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/Observable/throw';
import { throwError } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class EmployeeSetupService {

    constructor(private _http: Http) { }
    getEmployees(): Observable<IEmployee[]> {
        return this._http.get("http://localhost:52549/api/employees")
            .map((response: Response) => <IEmployee[]>response.json())
            .catch(this.handleError);
    }

    getEmployeeByCode(empCode: number): Observable<IEmployee> {
        return this._http.get("http://localhost:52549/api/employees/" + empCode)
            .map((response: Response) => <IEmployee>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);
    }
}