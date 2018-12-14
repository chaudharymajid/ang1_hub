import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from './employee/userPreference.service';
import { ICompanyService } from 'src/app/providers/company.service';
import { CompanyDetails } from 'src/app/models/company.model';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserPreferencesService, ICompanyService]
})
export class AppComponent implements OnInit {

  imageName: string;
  companyName: string;
    
  constructor(
    private companyserv: ICompanyService
  ) { }

  ngOnInit() {
    this.companyserv.getCompany()
      .subscribe((companyData) => {
      this.imageName = 'http://localhost:4543/Content/images/company/' + companyData.company_image,
      this.companyName = companyData.company_name
    },
        (error) => {
          'Problem with the service, plz try later';
        });
  }
}