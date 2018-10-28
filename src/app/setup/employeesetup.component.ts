import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService]
})

export class EmployeeSetup implements OnInit {
    employeeForm: FormGroup;
    companyDetails: CompanyDetails 

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private companyserv: ICompanyService
    ) { }

    ngOnInit() {

        this.companyserv.getCompany()
            .subscribe((companyData) => this.companyDetails = companyData,
                (error) => {
                    'Problem with the service, plz try later';
                });

            
            

        this.employeeForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            businessType: ['', [Validators.required]],
            compAddress: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            compEmail: ['', [Validators.required, Validators.email]],
            webAddress: [''],
            companyRegNum: [''],
            companyTaxNum: [''],
            companyLogo: ['']
        });

        
        var subButton = <HTMLInputElement>document.getElementById("submitButton");
        this.employeeForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.employeeForm);
            if (this.employeeForm.get('companyName').valid
                && this.employeeForm.get('businessType').valid
                && this.employeeForm.get('compAddress').valid
                && this.employeeForm.get('phoneNumber').valid
                && this.employeeForm.get('compEmail').valid) {
                subButton.disabled = false;
            } else {
                subButton.disabled = true;
            }
        })
        
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

    onSubmit() {
        console.log(this.companyDetails.company_reg_number + ' - ' + this.companyDetails.company_name + ' - ' + this.companyDetails.company_tax_number);
    }
}