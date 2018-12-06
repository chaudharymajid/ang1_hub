import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EmployeeDetails } from 'src/app/models/employeesetup.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with filtering
 */
@Component({
  selector: 'table-filtering-example',
  styleUrls: ['testtable.component.css'],
  templateUrl: 'testtable.component.html',
})
export class TableFilteringExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  empDet: EmployeeDetails = {
    emp_id: null, 
    emp_firstname: null,
    emp_lastname: null,
    emp_middlename: null,
    emp_cat_id: null,
    emp_serv_id: null,
    emp_phone: null,
    emp_email: null,
    emp_password: null,
    emp_confirmpassword: null,
    emp_address: null,
    emp_photo: null,
    emp_comments: null,
    emp_department: null        
}
  click(event) {
    let clickEvent = event.target.id;
    this.empDet.emp_firstname = clickEvent;
  }
}