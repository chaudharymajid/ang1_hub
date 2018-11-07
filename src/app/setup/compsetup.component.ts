import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService]
})

export class CompSetup implements OnInit {
    employeeForm: FormGroup;
    compDet: Blob;
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
        private companyserv: ICompanyService,
        private http: HttpClient
    ) { }

    ngOnInit() {

        this.employeeForm = new FormGroup({
            companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
            businessType: new FormControl('', [Validators.required]),
            compAddress: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            compEmail: new FormControl(''),
            webAddress: new FormControl(''),
            companyRegNum: new FormControl(''),
            companyTaxNum: new FormControl(''),
            companyLogo: new FormControl('')
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

    file: File = null;
    onFileChange(event) {
        this.file = <File>event.target.files[0];
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
        fd.append('company_id', this.companyDetails.company_id.toString())

        if (this.file !== null) {
            fd.append('Image', this.file, this.file.name);
        }

        if (this.companyDetails.company_id === null) {
            this.http.post("http://localhost:50087/api/company/Post", fd).subscribe(res => {
                console.log(res)
            });
        } else {
            this.http.put("http://localhost:50087/api/company/Put", fd).subscribe(res => {
                console.log(res)
            });
        }
    }
}