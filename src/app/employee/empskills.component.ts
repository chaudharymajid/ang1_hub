import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'empskills.component.html',
    styleUrls: ['empskills.component.css']
})

export class EmployeeSkills implements OnInit {
    employeeForm : FormGroup;    
    
    constructor(
        private _homeRoute : Router
    ){}
    
    ngOnInit(){
        this.employeeForm = new FormGroup({
            fullName: new FormControl(),
            email: new FormControl(),
            skills: new FormGroup({
                skillName: new FormControl(),
                experienceInYears: new FormControl(),
                proficiency: new FormControl()
            })            
        });
    }

    onSave():void {
        console.log(this.employeeForm.value);
        this._homeRoute.navigate(['/home']);
    }
}