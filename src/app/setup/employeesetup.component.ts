import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDetails } from 'src/app/models/employeesetup.model';


@Component({
    templateUrl: 'employeesetup.component.html',
    providers: []
})

export class EmployeeSetup implements OnInit {
    employeeForm: FormGroup;
    empDetails: EmployeeDetails;

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {

        
        this.employeeForm = this.fb.group({
            emp_firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
            emp_lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
            emp_middlename: [''],
            emp_phone: ['', [Validators.required, Validators.minLength(2)]],
            emp_email: ['', [Validators.required, Validators.email]],
            address: ['', [Validators.required]],
            nationality: [''],
            photo_id: [''],
            emp_photo: ['']            
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

    // onSubmit() {
    //     console.log(this.companyDetails.company_reg_number + ' - ' + this.companyDetails.company_name + ' - ' + this.companyDetails.company_tax_number);
    // }
}