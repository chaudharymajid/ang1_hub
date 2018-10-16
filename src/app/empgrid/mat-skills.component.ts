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
    fullName : FormControl;    
    
    constructor(
        private _homeRoute : Router,
        private _fb : FormBuilder
    ){}
    
    ngOnInit(){
        // this.employeeForm = this._fb.group({
        //     fullName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
        //     email: [''],
        //     skills: this._fb.group({
        //         skillName:[''],
        //         experienceInYears: [''],
        //         proficiency: ['beginner']
        //     })
        // })
        // ;
        this.fullName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]);
    }

    getErrorMessage() {
        return this.fullName.hasError('required') ? 'You must enter a value' :
            this.fullName.hasError('fullName') ? 'Not a valid email' :
                '';
      }

    onSave():void {
        console.log(this.employeeForm.value);
        // this._homeRoute.navigate(['/home']);
    }

    onLoadData(): void {
        this.employeeForm.patchValue({
            fullName:'Majid',
            email: 'majid.chaudhary@yahoo.co.uk',
            skills:{
                skillName:'DBA',
                experienceInYears: 15,
                proficiency: 'intermediate'
            }
        });
    }
}