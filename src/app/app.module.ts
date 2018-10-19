import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeComponentList } from './employee/emp.complist';
import { EmployeeTitlePipe } from './employee/employeeTitle.pipe';
import { EmployeeCountComponent } from './employee/employeeCount.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { EmployeeService } from './employee/employee.service';
import { EmpGrid } from './empgrid/empgrid.component';
import { EmployeeSkills } from './employee/empskills.component';
import { MatSkills } from './empgrid/mat-skills.component';
import { CompSetup } from './setup/compsetup.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeComponentList },
  { path: 'employees/:code', component: EmployeeComponent },
  { path: 'grid', component: EmpGrid },
  { path: 'compsetup', component: CompSetup },
  { path: 'skills', component: EmployeeSkills },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, EmployeeComponent, EmployeeComponentList, EmployeeTitlePipe, EmployeeCountComponent, HomeComponent, PageNotFoundComponent, 
    EmpGrid, EmployeeSkills, MatSkills, CompSetup
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, BsDropdownModule, TooltipModule, ModalModule, RouterModule.forRoot(appRoutes), BrowserAnimationsModule, 
    MaterialModule, ReactiveFormsModule
  ],
  exports: [],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }