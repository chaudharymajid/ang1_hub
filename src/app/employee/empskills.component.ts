import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
            email: [''],
            skills: this._fb.group({
                skillName:[''],
                experienceInYears: [''],
                proficiency: ['beginner']
            })
        })
        ;
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

    // onLoadData(): void {
    //     this.employeeForm.setValue({
    //       fullName: 'Pragim Technologies',
    //       email: 'pragim@pragimtech.com',
    //       skills: {
    //         skillName: 'C#',
    //         experienceInYears: 5,
    //         proficiency: 'beginner'
    //       }
    //     });
    //   }
}