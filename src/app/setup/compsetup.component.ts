import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { EmployeeDetails } from 'src/app/models/employeesetup.model';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService]
})

export class CompSetup implements OnInit, AfterContentInit {
    companyForm: FormGroup;
    empRegForm: FormGroup;

    logo: File;
    binaryLogo: Blob;
    rootUrl: string = "http://localhost:4543/";
    someString: string;

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
        company_logo: null,
        company_image: null
    }

    empDet: EmployeeDetails = {
        empId: null,
        firstname: null,
        lastname: null,
        middlename: null,
        phone: null,
        email: null,
        password: null,
        confirmPassword: null,
        address: null,
        photoId: null,
        dept: null,
        mgrId: null   
    }

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private companyserv: ICompanyService,
        private http: HttpClient
    ) { }

    ngAfterContentInit() {

        this.companyserv.getCompany()
            .subscribe((companyData) => 
            {
                this.companyDetails = companyData,
                    this.someString = companyData.business_type
            },
                (error) => 
            {
                    'Problem with the service, plz try later';
        });

        // this.http.get<EmployeeDetails>(this.rootUrl + "api/employeereg").subscribe((res) => {
        //     this.empDet = res},
        //     (error) => {
        //         'Problem with the service, plz try later';
        //     }); 
                
    }

            
    


    ngOnInit() {

        this.companyForm = new FormGroup({
            companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            businessType: new FormControl('', [Validators.required]),
            compAddress: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            compEmail: new FormControl('', [Validators.email]),
            webAddress: new FormControl('', [Validators.required]),
            companyRegNum: new FormControl(''),
            companyTaxNum: new FormControl(''),
            companyLogo: new FormControl('')
        });

        this.empRegForm = this.fb.group({
            firstName: ['', [Validators.required]],
            LastName: ['', [Validators.required]],
            middleName: [''],
            empEmail: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
            hireDate: [''],
            fireDate: [''],
            nationality: [''],
            phone: [''],
            dept: [''],
            mgrId: [''],
            empId: [''],
            photoId: [''],
            address: [''],
            comments: ['']
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

    compValChange() {
        if (this.tabIndex == '2') {
            var subButton = <HTMLInputElement>document.getElementById('submitButton');
            // this.employeeForm.valueChanges.subscribe((data) => {
            //     this.logValidationErrors(this.employeeForm);
            //     if (this.employeeForm.get('companyName').valid
            //         && this.employeeForm.get('businessType').valid
            //         && this.employeeForm.get('compAddress').valid
            //         && this.employeeForm.get('phoneNumber').valid
            //         && this.employeeForm.get('compEmail').valid) {
            //         subButton.disabled = false;
            //     } else {
            //         subButton.disabled = true;
            //     }
            // });
            if (this.companyForm.get('companyName').valid
                && this.companyForm.get('businessType').valid
                && this.companyForm.get('compAddress').valid
                && this.companyForm.get('phoneNumber').valid
                && this.companyForm.get('compEmail').valid) {
                subButton.disabled = false;
                console.log(this.companyDetails.company_name);
            } else {
                subButton.disabled = true;
            }
        }
    }

    file: File = null;
    fileName: any;
    fileType: string;

    onFileChange(event) {
        this.file = <File>event.target.files[0];
        var subButton = <HTMLInputElement>document.getElementById('submitButton');
        if (this.companyForm.get('companyName').valid
            && this.companyForm.get('businessType').valid
            && this.companyForm.get('compAddress').valid
            && this.companyForm.get('phoneNumber').valid
            && this.companyForm.get('compEmail').valid) {
            subButton.disabled = false;
        }

    }

    onCompanySubmit() {
        const fd = new FormData();

        fd.append('company_name', this.companyForm.value.companyName);
        fd.append('business_type', this.companyForm.value.businessType);
        fd.append('company_address', this.companyForm.value.compAddress);
        fd.append('phone_number', this.companyForm.value.phoneNumber);
        fd.append('company_email', this.companyForm.value.compEmail);
        fd.append('web_address', this.companyForm.value.webAddress);
        fd.append('company_reg_number', this.companyForm.value.companyRegNum);
        fd.append('company_tax_number', this.companyForm.value.companyTaxNum);

        if (this.file !== null) {
            fd.append('Image', this.file, this.file.name);

            if (this.companyDetails.company_id == null) {
                this.http.post(this.rootUrl + "api/company/Post", fd).subscribe(res => {
                    console.log(res)
                });
            } else {
                fd.append('company_id', this.companyDetails.company_id.toString());
                this.http.put(this.rootUrl + "api/company/Put", fd).subscribe(res => {
                    console.log(res)
                });
            }
        }

        else {
            alert("Please choose a logo file")
        }
    }


    // *******Employee Table & Form**********
    // **************************************
    // **************************************

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    
    click(event) {
        let id = event.target.id;
        this.http.get<EmployeeDetails>(this.rootUrl + "api/employeereg/" + id).subscribe((res) => {
            this.empDet = res
        },
            (error) => {
                'Problem with the service, plz try later';
            });          
    }
    

    tabIndex: string;
    tabName: string;

    tabChanged(event) {
        this.tabIndex = event.index;
        this.tabName = event.tab.textLabel;
    }

    onEmpSubmit() {
        var fd = new FormData();

        fd.append('firstName', this.empRegForm.value.firstName);
        fd.append('lastName', this.empRegForm.value.lastName);
        fd.append('middleName', this.empRegForm.value.middleName);
        fd.append('email', this.empRegForm.value.email);        
        fd.append('phone', this.empRegForm.value.phone);
        fd.append('address', this.empRegForm.value.address);
        fd.append('hireDate', this.empRegForm.value.hireDate);
        fd.append('fireDate', this.empRegForm.value.fireDate);
        fd.append('nationality', this.empRegForm.value.nationality);
        fd.append('dept', this.empRegForm.value.dept);
        fd.append('mgrId', this.empRegForm.value.mgrId);
        fd.append('comments', this.empRegForm.value.comments);
        fd.append('empId', this.empRegForm.value.empId);
        
        var createUser = new FormData();
        createUser.append('email', this.empRegForm.value.email); 
        createUser.append('password', this.empRegForm.value.password);
        createUser.append('confirmPassword', this.empRegForm.value.confirmPassword);
        
        if (this.empPhoto !=null){
            fd.append('Image', this.empPhoto, this.empPhoto.name);
        }
        

        if (this.empRegForm.value.empId === null || this.empRegForm.value.empId === '') {
            

            this.http.post(this.rootUrl + "api/account/register", createUser).subscribe(res => {
                console.log(res)
            });
            
        } else {
            fd.append('company_id', this.companyDetails.company_id.toString());
            this.http.put(this.rootUrl + "api/EmployeeReg/Put", fd).subscribe(res => {
                console.log(res)
            });
        }
    }
    
    empPhoto: File = null;    

    onEmpChange(event) {
        this.empPhoto = <File>event.target.files[0];
    }
}