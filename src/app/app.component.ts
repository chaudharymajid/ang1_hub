import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { UserPreferencesService } from './employee/userPreference.service';
import { ICompanyService } from 'src/app/providers/company.service';
import { CompanyDetails } from 'src/app/models/company.model';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserPreferencesService, ICompanyService]
})
export class AppComponent implements OnInit {
  pageHeader: string = 'Employee Details';
  imagePath: string = 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31';

  firstName: string = 'Tommy';
  lastName: string = 'Cat';
  classesToApply: string = 'italicClass boldClass';
  applyBoldClass: boolean = true;
  compDetails: CompanyDetails = {
    company_id: null,
    company_name: null,
    business_type: null,
    company_address: null,
    phone_number: null,
    company_email: null,
    web_address: null,
    company_reg_number: null,
    company_tax_number: null,
    parent_company: null,
    company_logo: null,
  }

  constructor(
    private companyserv: ICompanyService
  ) { }

  ngOnInit() {
    this.companyserv.getCompany()
      .subscribe((companyData) => this.compDetails = companyData,
        (error) => {
          'Problem with the service, plz try later';
        });        
  }


  getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  onClick(): void {
    alert('Button Clicked');
  }
}