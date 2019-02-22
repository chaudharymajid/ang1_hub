import { Injectable } from '@angular/core';
import { Observable, Subject, observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IDeptService {

    constructor(private _http: HttpClient) { }
    rootUrl: string = "http://localhost:3200/";
    

    getDept(): Observable<Response[]> {
        return this._http.get<Response[]>(this.rootUrl + "dept")        
            .catch(this.handleError);
    }

    getDeptByCode(deptId: number): Observable<Response> {
        return this._http.get<Response>(this.rootUrl + "dept/" + deptId).map(Response => Response)
            .catch(this.handleError);
    }   

    updateDept(fd, deptId): Observable<Response> {
        return this._http.put<Response>(this.rootUrl + "dept/" + deptId, fd).map(Response => Response)
        .catch(this.handleError);
    }

    delDept(deptId): Observable<Response> {
        return this._http.delete<Response>(this.rootUrl + "users/" + deptId).map(Response => Response)
        .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);
    }
}