import { Injectable } from '@angular/core';
import { IEmployee } from '../employee/employee';
import { Observable, Subject, observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/Observable/throw';
import { throwError } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class EmployeeService {

    constructor(private _http: HttpClient) { }
    getEmployees(): Observable<IEmployee[]> {
        return this._http.get<IEmployee[]>("http://localhost:52549/api/employees")
            .catch(this.handleError);
    }

    getEmployeeByCode(empCode: number): Observable<IEmployee> {
        return this._http.get<IEmployee>("http://localhost:52549/api/employees/" + empCode)
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);
    }
}