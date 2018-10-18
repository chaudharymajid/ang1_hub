import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'mat-skills.component.html'
    // ,
    // styleUrls : ['mat-skills.component.css']
})

export class MatSkills implements OnInit {
    employeeForm : FormGroup;
    mailAddress : string;
    mailAddress1 : string;
    
    constructor(
        private _homeRoute : Router,
        private fb : FormBuilder
    ){}
    
    ngOnInit(){
        this.employeeForm = this.fb.group({
            companyName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            businessType: ['',[Validators.required]],
            compAddress: ['',[Validators.required]],
            phoneNumber: ['',[Validators.required]],
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

    onSave():void {
        let mailAddress2 = this.fb.control('compEmail').value;
    }

    onLoadData(): void {
        
    }
}