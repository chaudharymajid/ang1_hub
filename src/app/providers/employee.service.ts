import { Injectable } from '@angular/core';
import { EmployeeDetails } from 'src/app/models/employeesetup.model';
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
    rootUrl: string = "http://localhost:3200/";

    logIn(fd): Observable<Response> {
        return this._http.post<Response>(this.rootUrl + "users/login", fd).map(Response => Response)     
            .catch(this.handleError);
    }

    getEmployees(): Observable<EmployeeDetails[]> {
        return this._http.get<EmployeeDetails[]>(this.rootUrl + "users")        
            .catch(this.handleError);
    }

    getEmployeeByCode(emp: EmployeeDetails): Observable<EmployeeDetails> {
        
        return this._http.get<EmployeeDetails>(this.rootUrl + "api/employees/" + emp.empId)
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);        
    }
}