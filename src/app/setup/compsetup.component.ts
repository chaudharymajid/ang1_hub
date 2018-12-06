import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService]
})

export class CompSetup implements OnInit {
    employeeForm: FormGroup;
    logo: File;
    binaryLogo: Blob;

    companyDetails: CompanyDetails = {
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
        company_image: null
    }

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private companyserv: ICompanyService,
        private http: HttpClient
    ) { }

    ngOnInit() {

        this.employeeForm = new FormGroup({
            companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            businessType: new FormControl('', [Validators.required]),
            compAddress: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            compEmail: new FormControl('', [Validators.email]),
            webAddress: new FormControl('', [Validators.required]),
            companyRegNum: new FormControl(''),
            companyTaxNum: new FormControl(''),
            companyLogo: new FormControl('')
        });

        this.companyserv.getCompany()
            .subscribe((companyData) => this.companyDetails = companyData,
                (error) => {
                    'Problem with the service, plz try later';
                });
    }

    formErrors = {
        'companyName': '',
        'businessType': '',
        'compAddress': '',
        'phoneNumber': '',
        'compEmail': ''
    }

    validationMessages = {
        'companyName': {
            'required': 'Name is required',
            'minlength': 'Name must be greater than 2 characters',
            'maxlength': 'Name must not exceed 25 characters'
        },

        'businessType': {
            'required': 'Business Type is required'
        },

        'compAddress': {
            'required': 'Address is required'
        },

        'phoneNumber': {
            'required': 'Phone is required'
        },

        'compEmail': {
            'required': 'Email is required',
            'email': 'Not valid email address'
        }
    }

    logValidationErrors(group: FormGroup): void {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);
            }
            else {
                this.formErrors[key] = '';
                if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                    const messages = this.validationMessages[key];
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            this.formErrors[key] += messages[errorKey] + ' ';
                        }
                    }
                }
            }
        })
    }

    compValChange() {
        if (this.tabIndex == '2') {
             var subButton = <HTMLInputElement>document.getElementById('submitButton');
            // this.employeeForm.valueChanges.subscribe((data) => {
            //     this.logValidationErrors(this.employeeForm);
            //     if (this.employeeForm.get('companyName').valid
            //         && this.employeeForm.get('businessType').valid
            //         && this.employeeForm.get('compAddress').valid
            //         && this.employeeForm.get('phoneNumber').valid
            //         && this.employeeForm.get('compEmail').valid) {
            //         subButton.disabled = false;
            //     } else {
            //         subButton.disabled = true;
            //     }
            // });
            if (this.employeeForm.get('companyName').valid
                    && this.employeeForm.get('businessType').valid
                    && this.employeeForm.get('compAddress').valid
                    && this.employeeForm.get('phoneNumber').valid
                    && this.employeeForm.get('compEmail').valid) {
                    subButton.disabled = false;
                    console.log(this.companyDetails.company_name);
                } else {
                    subButton.disabled = true;
                }
        }
    }

    file: File = null;
    fileName: any;
    fileType: string;

    onFileChange(event) {
        this.file = <File>event.target.files[0];
        var subButton = <HTMLInputElement>document.getElementById('submitButton');
        if (this.employeeForm.get('companyName').valid
        && this.employeeForm.get('businessType').valid
        && this.employeeForm.get('compAddress').valid
        && this.employeeForm.get('phoneNumber').valid
        && this.employeeForm.get('compEmail').valid) {
        subButton.disabled = false;
    }

    }

    onSubmit() {
        const fd = new FormData();

        fd.append('company_name', this.companyDetails.company_name);
        fd.append('business_type', this.companyDetails.business_type);
        fd.append('company_address', this.companyDetails.company_address);
        fd.append('phone_number', this.companyDetails.phone_number);
        fd.append('company_email', this.companyDetails.company_email);
        fd.append('web_address', this.companyDetails.web_address);
        fd.append('company_reg_number', this.companyDetails.company_reg_number);
        fd.append('company_tax_number', this.companyDetails.company_tax_number);

        if (this.file !== null) {
            fd.append('Image', this.file, this.file.name);

            if (this.companyDetails.company_id == null) {
                this.http.post("https://localhost:44317/api/company/Post", fd).subscribe(res => {
                    console.log(res)
                });
            } else {
                fd.append('company_id', this.companyDetails.company_id.toString());
                this.http.put("https://localhost:44317/api/company/Put", fd).subscribe(res => {
                    console.log(res)
                });
            }
        }

        else {
            alert("Please choose a logo file")
        }
    }


    // *******Employee Table & Form**********
    // **************************************
    // **************************************

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

    tabIndex: string;
    tabName: string;

    tabChanged(event) {
        this.tabIndex = event.index;
        this.tabName = event.tab.textLabel;
    }
}