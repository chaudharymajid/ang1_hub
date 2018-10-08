import { Component, OnInit } from "@angular/core";
import { IEmployee } from "src/app/employee/employee";
import { EmployeeService } from "src/app/employee/employee.service";

@Component({
    selector: 'empgrid',
    templateUrl: 'empgrid.component.html',
    providers: [EmployeeService],
    styleUrls:['empgrid.component.css']    
})
export class EmpGrid implements OnInit {

    employees: IEmployee[];
    statusMessage: string = "Loading data, Please wait ...";
    
    constructor(private _employeeService: EmployeeService) {
    }

    ngOnInit() {
        this._employeeService.getEmployees()
            .subscribe((employeesData) => this.employees = employeesData, 
            (error) => {this.statusMessage = 'Problem with the service, plz try later';
        });
    }
}