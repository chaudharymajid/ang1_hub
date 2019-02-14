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

    signUp(fd): Observable<Response> {
        return this._http.post<Response>("http://localhost:3200/users/signup", fd).map(Response => Response)     
            .catch(this.handleError);
    }

    signUpPhoto(fd): Observable<Response> {
        return this._http.post<Response>("http://localhost:3200/users/signup", fd).map(Response => Response)     
            .catch(this.handleError);
    }

    updateUser(fd, id): Observable<Response> {
        return this._http.put<Response>(this.rootUrl + "users/update/" + id, fd).map(Response => Response)
        .catch(this.handleError);
    }

    updateUserPhoto(fd): Observable<Response> {
        return this._http.put<Response>(this.rootUrl + "users/update/" + fd.empId, fd).map(Response => Response)
        .catch(this.handleError);
    }

    getEmployees(): Observable<EmployeeDetails[]> {
        return this._http.get<EmployeeDetails[]>(this.rootUrl + "users")        
            .catch(this.handleError);
    }

    getEmployeeByCode(empId: number): Observable<Response> {
        return this._http.get<Response>(this.rootUrl + "users/" + empId).map(Response => Response)
            .catch(this.handleError);
    }

    handleError(error: Response) {
        //console.error(error);
        return ErrorObservable.create(error);        
    }
}