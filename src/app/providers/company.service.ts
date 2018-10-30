import { Injectable } from '@angular/core';
import { CompanyDetails } from '../models/company.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Subject, observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ICompanyService {

    constructor(private _http: Http) { }
    
    getCompany(): Observable<CompanyDetails> {
        return this._http.get("http://localhost:50087/api/company")
            .map((response: Response) => <CompanyDetails>response.json())
            .catch(this.handleError);
    }

    updateCompany(companyDetails: CompanyDetails): Observable<CompanyDetails> {
        if (companyDetails.company_id === null) {
            let headers = new Headers;
            headers.append('Content-Type', 'application/json');
            return this._http.post("http://localhost:50087/api/company", companyDetails, {
                headers: headers
            }).map((response: Response) => <CompanyDetails>response.json())
                .catch(this.handleError);
        } else {
            let headers = new Headers;
            headers.append('Content-Type', 'application/json');
            return this._http.put("http://localhost:50087/api/company", companyDetails, {
                headers: headers
            }).map((response: Response) => <CompanyDetails>response.json())
                .catch(this.handleError);
        }
    }
    
    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);
    }
}