import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';

@Component({
    templateUrl: 'compsetup.component.html'
})

export class CompSetup implements OnInit {
    employeeForm: FormGroup;

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.employeeForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            businessType: ['', [Validators.required]],
            compAddress: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            compEmail: ['', [Validators.required, Validators.email]],
            webAddress: [''],
            companyRegNum: [''],
            companyTaxNum: ['']
        });

    }

    // getErrorMessage() {
    //     return this.fullName.hasError('required') ? 'You must enter a value' :
    //         this.fullName.hasError('fullName') ? 'Not a valid email' :
    //             '';
    //   }

    // onSave():void {
    //     this.comp = (this.employeeForm.get('compEmail').value, this.employeeForm.get('compName').value)
    //     // let mailAddress2 = this.fb.control('compEmail').value;
    //     console.log(this.comp);
    //     this.employeeForm.reset();
    // }

    onClearButtonClick(): void {
        this.employeeForm.reset();
    }
}
