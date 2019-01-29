import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from './employee/userPreference.service';
import { ICompanyService } from 'src/app/providers/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [UserPreferencesService, ICompanyService]
})
export class AppComponent implements OnInit {

  imageName: string;
  companyName: string;
    
  constructor(
    private companyserv: ICompanyService, private router: Router
  ) { }

  ngOnInit() {
    this.companyserv.getCompany()
      .subscribe((companyData) => {
      this.imageName = 'http://localhost:3200/' + companyData[0].company_image,
      this.companyName = companyData[0].company_name
    },
        (error) => {
          'Problem with the service, plz try later';
        });
  }
 
  logOff() {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');

    this.router.navigateByUrl('/user')
  }

}