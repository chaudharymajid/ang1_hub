import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyDetails } from 'src/app/models/company.model';
import { ICompanyService } from 'src/app/providers/company.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { EmployeeDetails } from 'src/app/models/employeesetup.model';
import { EmployeeService } from 'src/app/providers/employee.service';

export class empTable {
    firstName: string;
    lastName: string;
    dept: string;
    comments: string;
    empId: string;
}

@Component({
    templateUrl: 'compsetup.component.html',
    providers: [ICompanyService, EmployeeService]
})

export class CompSetup implements OnInit {
    companyForm: FormGroup;
    employeeForm: FormGroup;
    rootUrl: string = "http://localhost:3200/";
    empTableSource: Array<empTable> = [];
    dataSource: MatTableDataSource<empTable>;
    empImgPath: string = this.rootUrl + 'Content/images/employees/';
    compSelectedImage: string;
    compOldImg: string;

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

    constructor(
        private _homeRoute: Router,
        private fb: FormBuilder,
        private companyserv: ICompanyService,
        private empserv: EmployeeService,
        private http: HttpClient,
        private router: Router,
        private _cdr: ChangeDetectorRef
    ) {
        this.companyForm = this.fb.group({
            companyName: [''],
            businessType: [''],
            compAddress: [''],
            phoneNumber: [''],
            compEmail: [''],
            webAddress: [''],
            companyRegNum: [''],
            companyTaxNum: [''],
            companyImg: [''],
            companyId: ['']
        });

        this.employeeForm = this.fb.group({
            empId: [''],
            firstName: [''],
            lastName: [''],
            middleName: [''],
            phone: [''],
            email: [''],
            password: [''],
            confirmPassword: [''],
            address: [''],
            photoId: [''],
            dept: [''],
            mgrId: [''],
            comments: [''],
            hireDate: [''],
            fireDate: [''],
            nationality: [''],
        });

        this.empserv.getEmployees()
            .subscribe((res) => {
                res.forEach((value) => {
                    let newarr = new empTable();
                    newarr.empId = value.empId;
                    newarr.firstName = value.firstName;
                    newarr.lastName = value.lastName;
                    newarr.dept = value.dept;
                    newarr.comments = value.comments;
                    this.empTableSource.push(newarr);
                });
                this.dataSource = new MatTableDataSource(this.empTableSource);                
            },
                (error) => {
                    'Problem with the service, plz try later';
                });
    }

    ngOnInit() {
        this.companyserv.getCompany()
            .subscribe((companyData) => {
                this.modelToForm(companyData[0]),
                this.compSelectedImage = 'http://localhost:3200/' + companyData[0].company_image,
                this.compOldImg = 'G:\\Users\\chaudhary\\Downloads\\nodejs\\uploads\\' + companyData[0].company_image
            }
                ,
                (error) => {
                    'Problem with the service, plz try later';
                });

    }

    modelToForm(data): void {
        this.companyForm.patchValue({
            companyName: data.company_name,
            businessType: data.business_type,
            compAddress: data.company_address,
            phoneNumber: data.phone_number,
            compEmail: data.company_email,
            webAddress: data.web_address,
            companyRegNum: data.company_reg_number,
            companyTaxNum: data.company_tax_number,
            companyImg: data.company_image,
            companyId: data.company_id,

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
        var reader = new FileReader();
        reader.onload = (event:any) => {
            this.compSelectedImage = event.target.result;
        }
        reader.readAsDataURL(this.file);

        var subButton = <HTMLInputElement>document.getElementById('submitButton');
        if (this.companyForm.get('companyName').valid
            && this.companyForm.get('businessType').valid
            && this.companyForm.get('compAddress').valid
            && this.companyForm.get('phoneNumber').valid
            && this.companyForm.get('compEmail').valid) {
            subButton.disabled = false;
        }

    }

    onSubmit() {
        const fd = new FormData();

        fd.append('company_name', this.companyForm.value.companyName);
        fd.append('business_type', this.companyForm.value.businessType);
        fd.append('company_address', this.companyForm.value.compAddress);
        fd.append('phone_number', this.companyForm.value.phoneNumber);
        fd.append('company_email', this.companyForm.value.compEmail);
        fd.append('web_address', this.companyForm.value.webAddress);
        fd.append('company_reg_number', this.companyForm.value.companyRegNum);
        fd.append('company_tax_number', this.companyForm.value.companyTaxNum);
        fd.append('modification_date', new Date().toString());
        fd.append('oldImg', this.compOldImg);

        if (this.file === null) {
            if (this.companyForm.value.companyId === null || this.companyForm.value.companyId === "") {
                this.http.post("http://localhost:3200/company", fd).subscribe(res => {
                    // console.log(res)
                });
            } else {
                fd.append('company_id', this.companyForm.value.companyId.toString());
                this.http.put("http://localhost:3200/company", fd).subscribe(res => {
                    // console.log(res)
                });
            }
        } else {
            fd.append('company_image', this.file, this.companyForm.value.companyName + this.file.name);            
            if (this.companyForm.value.companyId == null || this.companyForm.value.companyId === "") {
                this.http.post("http://localhost:3200/companyfileupload", fd).subscribe(res => {
                    console.log(res)
                });
            } else {
                fd.append('company_id', this.companyForm.value.companyId.toString());
                this.http.put("http://localhost:3200/companyfileupload", fd).subscribe(res => {
                    console.log(res)
                });
            }
        }  
        window.location.reload();
    }



    // *******Employee Table & Form**********
    // **************************************
    // **************************************

    displayedColumns: string[] = ['firstName', 'lastName', 'dept', 'comments'];

    //this.dataSource = new MatTableDataSource(this.def);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    empDet: EmployeeDetails = {
        empId: null,
        firstName: null,
        lastName: null,
        middleName: null,
        phone: null,
        email: null,
        password: null,
        confirmPassword: null,
        address: null,
        photoId: null,
        dept: null,
        mgrId: null,
        mgrName: null,
        comments: null,
        hireDate: null,
        fireDate: null,
        nationality: null,
    }

    click(event) {
        let clickEvent = +event.target.id;

        let selectEmp: EmployeeDetails;
        this.empserv.getEmployees()
            .subscribe((res) => {
                res.forEach((value) => {
                    if (+value.empId === clickEvent) {
                        this.updateEmpView(value);
                        this.employeeForm.controls['password'].disable();
                        this.employeeForm.controls['confirmPassword'].disable();
                    }
                });
            },
                (error) => {
                    'Problem with the service, plz try later';
                });
    }

    updateEmpView(value): void {
        this.employeeForm.patchValue({
            firstName: value.firstName,
            lastName: value.lastName,
            middleName: value.middleName,
            email: value.email,
            hireDate: value.hireDate,
            fireDate: value.fireDate,
            nationality: value.nationality,
            phone: value.phone,
            dept: value.dept,
            address: value.address,
            comments: value.comments,
            empId: value.empId,
            photoId: this.empImgPath + value.photoId,
        });

    }

    tabIndex: string;
    tabName: string;

    tabChanged(event) {
        // this.tabIndex = event.index;
        // this.tabName = event.tab.textLabel;       
    }

    onEmpSubmit(): void {
        const fd = new FormData();

        fd.append('firstName', this.employeeForm.value.firstName);
        fd.append('lastName', this.employeeForm.value.lastName);
        fd.append('middleName', this.employeeForm.value.middleName);
        fd.append('email', this.employeeForm.value.email);
        fd.append('phone', this.employeeForm.value.phone);
        fd.append('address', this.employeeForm.value.address);
        fd.append('hireDate', this.employeeForm.value.hireDate);
        fd.append('fireDate', this.employeeForm.value.fireDate);
        fd.append('nationality', this.employeeForm.value.nationality);
        fd.append('dept', this.employeeForm.value.dept);
        fd.append('mgrId', this.employeeForm.value.mgrId);
        fd.append('comments', this.employeeForm.value.comments);

        if (this.employeeForm.value.empId == "") {
            this.http.post(this.rootUrl + "api/employeereg/Post", fd).subscribe(res => {
                console.log(res)
            });
        } else {
            fd.append('empId', this.employeeForm.value.empId);
            this.http.put(this.rootUrl + "api/employeereg/Put", fd).subscribe(res => {
                console.log(res)
            });
        }
    }
}