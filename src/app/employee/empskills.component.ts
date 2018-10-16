import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { keyframes } from '@angular/animations';
import { Key } from 'protractor';

@Component({
    templateUrl: 'empskills.component.html',
    styleUrls: ['empskills.component.css']
})

export class EmployeeSkills implements OnInit {
    employeeForm : FormGroup;    
    
    constructor(
        private _homeRoute : Router,
        private _fb : FormBuilder
    ){}
    
    ngOnInit(){
        this.employeeForm = this._fb.group({
            fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            email: ['', [Validators.required, Validators.email]],
            skills: this._fb.group({
                skillName:['',[Validators.required]],
                experienceInYears: ['',[Validators.required]],
                proficiency: ['beginner']
            })
        })
        ;

        this.employeeForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.employeeForm);
        })
    }

    formErrors = {
        'fullName' : '',
        'email' : '',
        'skillName' : '',
        'experienceInYears' : '',
        'proficiency' : ''
    }

    validationMessages = {
        'fullName' : {
            'required' : 'Name is required',
            'minlength' : 'Name must be greater than 2 characters',
            'maxlength' : 'Name must not exceed 15 characters'
        },
        'email' : {
            'required' : 'Email is required',
            'email' : 'Not valid email address'
        },
        'skillName' : {
            'required' : 'Skill is required'
        },
        'proficiency' : {
            'required' : 'It is required'
        },
        'experienceInYears' : {
            'required' : 'Experience is required'
        }
    }

    logValidationErrors(group : FormGroup):void {
        Object.keys(group.controls).forEach((key:string) => {
            const abstractControl = group.get(key);
            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl);                
            }
            else {
                this.formErrors[key] = '';
                if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
                    const messages = this.validationMessages[key];
                    for(const errorKey in abstractControl.errors){
                        if(errorKey){
                            this.formErrors[key] += messages[errorKey] + ' ';                            
                        }
                    }
                }
            }
        })
    }
    
    onSave():void {
        console.log(this.employeeForm.value);
        // this._homeRoute.navigate(['/home']);
    }

    onLoadData(): void {
        this.logValidationErrors(this.employeeForm);
        console.log(this.formErrors);
      }
}