import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeComponentList } from './employee/emp.complist';
import { EmployeeTitlePipe } from './employee/employeeTitle.pipe';
import { EmployeeCountComponent } from './employee/employeeCount.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './Others/pageNotFound.component';
import { EmployeeService } from './providers/employee.service';
import { EmpGrid } from './empgrid/empgrid.component';
import { EmployeeSkills } from './employee/empskills.component';
import { MatSkills } from './empgrid/mat-skills.component';
import { CompSetup, ConfirmationModal } from './setup/compsetup.component';
import { EmployeeSetup } from './setup/employeesetup.component';
import { TableFilteringExample } from './testtable/testtable.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './providers/auth.interceptor';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'employees/:code', component: EmployeeComponent },
  { path: 'empsetup', component: TableFilteringExample },
  { path: 'compsetup', component: CompSetup },
  { path: 'skills', component: EmployeeSkills },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, EmployeeComponent, EmployeeComponentList, EmployeeTitlePipe, EmployeeCountComponent, HomeComponent, PageNotFoundComponent, 
    EmpGrid, EmployeeSkills, MatSkills, CompSetup, EmployeeSetup, TableFilteringExample, UserComponent, UserComponent, LoginComponent, ConfirmationModal
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BsDropdownModule, TooltipModule, ModalModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, 
    MaterialModule, ReactiveFormsModule, HttpModule, HttpClientModule
  ],
  entryComponents:[
    ConfirmationModal
  ],
  exports: [],
  providers: [EmployeeService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }