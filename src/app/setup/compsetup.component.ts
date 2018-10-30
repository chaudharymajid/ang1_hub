import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService]
})

export class CompSetup implements OnInit {
    employeeForm: FormGroup;
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
    company_logo: null
    }

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private companyserv: ICompanyService
    ) { }

    ngOnInit() {

        this.employeeForm = new FormGroup ({
            companyName: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
            businessType: new FormControl ('', [Validators.required]),
            compAddress: new FormControl ('', [Validators.required]),
            phoneNumber: new FormControl ('', [Validators.required]),
            compEmail: new FormControl ('', [Validators.required, Validators.email]),
            webAddress: new FormControl (''),
            companyRegNum: new FormControl (''),
            companyTaxNum: new FormControl (''),
            companyLogo: new FormControl ('')
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

    onFileChange(event){
        let file = event.target.files[0];
    }

    onSubmit() {
        this.companyserv.updateCompany(this.companyDetails)
            .subscribe((companyData) => this.companyDetails = companyData,
                (error) => {
                    'Problem with the service, plz try later';
                });                
    }
}