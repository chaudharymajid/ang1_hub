import { Injectable } from '@angular/core';
import { CompanyDetails } from '../models/company.model';
import { Observable, Subject, observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ICompanyService {

    constructor(private _http: HttpClient) { }
    rootUrl: string = "http://localhost:4543/";

    getCompany(): Observable<CompanyDetails> {
        return this._http.get<CompanyDetails>(this.rootUrl+"api/company")
            .catch(this.handleError);
    }

    updateCompany(companyDetails: CompanyDetails): Observable<CompanyDetails> {
        let headers = new HttpHeaders;
        headers.append('Content-Type', 'application/json')

        if (companyDetails.company_id === null) {
            return this._http.post<CompanyDetails>(this.rootUrl+"api/company", companyDetails, {
                headers: headers
            })
                .catch(this.handleError);
        } else {
            return this._http.put<CompanyDetails>(this.rootUrl+"api/company", companyDetails, {
                headers: headers
            })
                .catch(this.handleError);
        }
    }

    upLoadImg(file, companyDetails) : Observable<CompanyDetails>{

        let img = file[0];
        let imgheaders = new HttpHeaders;
        imgheaders.append('Content-Type', 'multipart/form-data');

        if(companyDetails.company_id === null){
            return this._http.post<CompanyDetails>("https://localhost:44317/api/company", file, {
            headers: imgheaders
        })
            .catch(this.handleError);
    } else {
        return this._http.post<CompanyDetails>("https://localhost:44317/api/company", file, {
            headers: imgheaders
        })
            .catch(this.handleError);
    }
    }

    handleError(error: Response) {
        console.error(error);
        return ErrorObservable.create(error);
    }
}