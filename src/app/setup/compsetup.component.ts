import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { CompanyDetails } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/providers/company.service';

@Component({
    templateUrl: 'compsetup.component.html',
    providers:[CompanyService]
})

export class CompSetup implements OnInit {
    employeeForm: FormGroup;
    company: CompanyDetails;
    

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

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private _companyService: CompanyService
    ) { }

    ngOnInit() {

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

    formToModel(employeeForm: FormBuilder) {
        return employeeForm.group({
            fb: employeeForm.group(new CompanyDetails())
        });
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.employeeForm.get('companyLogo').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result
                })
            };
        }
    }

    onSubmit() {
        const result: CompanyDetails = Object.assign({}, this.employeeForm.value);
        console.log('www.webapi:5200' + '/' + result.companyLogo);
    }

    onLoadButtonClick(): void {
        this._companyService.getCompany()
            .subscribe((companyData) => this.company = companyData, 
            (error) => {'Problem with the service, plz try later';
        });
    }
}
