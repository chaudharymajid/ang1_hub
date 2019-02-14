import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
    employeeid: string;
    email: string;
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
    empSelectedImage: string;
    compOldImg: string;    
    empBtnDisabled = true;
    @ViewChild('empSbmtBtn') empSubmtBtn: ElementRef;
    @ViewChild('empResetBtn') empResetBtn: ElementRef;
    @ViewChild('empPhotoId') empPhotoIdBtn: ElementRef;


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
        private renderer: Renderer2
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
            endDate: [''],
            nationality: [''],
        });

        this.empserv.getEmployees()
            .subscribe((res) => {
                res.forEach((value) => {
                    let newarr = new empTable();
                    newarr.employeeid = value.empId;
                    newarr.firstName = value.firstName;
                    newarr.lastName = value.lastName;
                    newarr.dept = value.dept;
                    newarr.email = value.email;
                    newarr.comments = value.comments;
                    this.empTableSource.push(newarr);
                });
                console.log(this.empTableSource);
                this.dataSource = new MatTableDataSource(this.empTableSource);
            },
                (error) => {
                    if (error.status == 401) {
                        this.router.navigateByUrl('/user');
                    }
                    //this.router.navigateByUrl('/users');
                });

                this.companyserv.getCompany()
                .subscribe((companyData) => {
                    this.modelToForm(companyData[0]),
                        this.compSelectedImage = 'http://localhost:3200/' + companyData[0].company_image,
                        this.compOldImg = 'G:\\Users\\chaudhary\\Downloads\\nodejs\\uploads\\' + companyData[0].company_image
                }
                    ,
                    (error) => {
                        if (error.status == 401) {
                            this.router.navigateByUrl('/user');
                        }
                    });
    }

    ngOnInit() {
        this.employeeForm.valueChanges.subscribe((data) => {
            this.renderer.setProperty(this.empSubmtBtn, 'disabled', 'false');
            this.renderer.setProperty(this.empResetBtn, 'disabled', 'false');
        })
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
        reader.onload = (event: any) => {
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
        fd.append('modifiedBy', sessionStorage.getItem('userEmail') );

        if (this.file === null) {
            if (this.companyForm.value.companyId === null || this.companyForm.value.companyId === "") {
                console.log(fd.get('empId'));
                this.http.post("http://localhost:3200/company", fd).subscribe(res => {
                    // console.log(res)
                },
                    (error) => {
                        if (error.status == 401) {
                            this.router.navigateByUrl('/user');
                        } else {
                            console.log(error.status);
                        }
                        //this.router.navigateByUrl('/users');
                    });
            } else {
                fd.append('company_id', this.companyForm.value.companyId.toString());
                console.log(fd.get('company_name'));
                this.http.put("http://localhost:3200/company", fd).subscribe(res => {
                    // console.log(res)
                },
                    (error) => {
                        if (error.status == 401) {
                            this.router.navigateByUrl('/user');
                        } else {
                            console.log(error.status);
                        }
                        //this.router.navigateByUrl('/users');
                    });
            }
        } else {
            fd.append('company_image', this.file, this.companyForm.value.companyName + this.file.name);
            if (this.companyForm.value.companyId == null || this.companyForm.value.companyId === "") {
                this.http.post("http://localhost:3200/companyfileupload", fd).subscribe(res => {
                    console.log(res)
                },
                    (error) => {
                        if (error.status == 401) {
                            this.router.navigateByUrl('/user');
                        } else {
                            console.log(error.status);
                        }
                        //this.router.navigateByUrl('/users');
                    });
            } else {
                fd.append('company_id', this.companyForm.value.companyId.toString());
                this.http.put("http://localhost:3200/companyfileupload", fd).subscribe(res => {
                    console.log(res)
                },
                    (error) => {
                        if (error.status == 401) {
                            this.router.navigateByUrl('/user');
                        } else {
                            console.log(error.status);
                        }
                        //this.router.navigateByUrl('/users');
                    });
            }
        }
        //window.location.reload();
    }



    // *******Employee Table & Form**********
    // **************************************
    // **************************************

    displayedColumns: string[] = ['employeeid', 'firstName', 'lastName', 'dept', 'email', 'comments'];

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
        endDate: null,
        nationality: null,
    }

    click(event) {
        let empId = +event.target.id;
        let selectEmp: EmployeeDetails;

        this.employeeForm.get('password').disable();
        this.employeeForm.get('confirmPassword').disable();
        
        this.empserv.getEmployeeByCode(empId)
            .subscribe((res) => {
                this.updateEmpView(res[0])
            },

                (error) => {
                    if (error.status == 401) {
                        this.router.navigateByUrl('/user');
                    } else {
                        console.log(error.status);
                    }
                });       
    }

    updateEmpView(value): void {
        this.employeeForm.reset();
        this.employeeForm.patchValue({
            firstName: value.firstName,
            lastName: value.lastName,
            middleName: value.middleName,
            email: value.email,
            hireDate: value.hireDate,
            endDate: value.endDate,
            nationality: value.nationality,
            phone: value.phone,
            dept: value.dept,
            address: value.address,
            comments: value.comments,
            empId: value.empId,
            photoId: this.empImgPath + value.photoId,
        });
       
        this.empSelectedImage = (value.photoid !== null) ? this.rootUrl + value.photoid : null;
        this.renderer.setProperty(this.empSubmtBtn, 'disabled', 'true');
        this.renderer.setProperty(this.empResetBtn, 'disabled', 'false');
    }
    
    tabIndex: string;
    tabName: string;

    tabChanged(event) {
        // this.tabIndex = event.index;
        // this.tabName = event.tab.textLabel;       
    }

    empFile: File = null;
    onEmpFileChange(event) {
        this.empFile = <File>event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.empSelectedImage = event.target.result;
        }
        reader.readAsDataURL(this.empFile);

        if (this.employeeForm.value.firstName != "" || this.employeeForm.value.empId != "") {
            this.renderer.setProperty(this.empSubmtBtn, 'disabled', 'false');
            this.renderer.setProperty(this.empResetBtn, 'disabled', 'false');
        }
    }

    onEmpReset() {
        this.employeeForm.reset();
        this.employeeForm.get('password').enable();
        this.employeeForm.get('confirmPassword').enable();
        this.error = false;
        this.success = true;
        this.userCreated = false;
        this.userUpdated = false;
        this.renderer.setProperty(this.empSubmtBtn, 'disabled', 'true');
        this.renderer.setProperty(this.empResetBtn, 'disabled', 'true');
        this.renderer.setValue(this.empPhotoIdBtn, null);
        this.empSelectedImage = null;
        this.empFile = null;
    }

    error: boolean = false;
    success: boolean = false;
    userCreated: boolean = false;
    userUpdated: boolean = false;

    onEmpSubmit(): void {
        const fd = new FormData();
        this.error = false;
        if (this.employeeForm.value.password === this.employeeForm.value.confirmPassword) {

            fd.append('firstName', this.employeeForm.value.firstName);
            fd.append('lastName', this.employeeForm.value.lastName);
            fd.append('middleName', this.employeeForm.value.middleName);
            fd.append('email', this.employeeForm.value.email);
            fd.append('password', this.employeeForm.value.password);
            fd.append('confirmPassword', this.employeeForm.value.confirmPassword);
            fd.append('phone', this.employeeForm.value.phone);
            fd.append('address', this.employeeForm.value.address);
            fd.append('hireDate', this.employeeForm.value.hireDate);
            fd.append('endDate', this.employeeForm.value.endDate);
            fd.append('nationality', this.employeeForm.value.nationality);
            fd.append('dept', this.employeeForm.value.dept);
            fd.append('mgrId', this.employeeForm.value.mgrId);
            fd.append('comments', this.employeeForm.value.comments);
            fd.append('empId', this.employeeForm.value.empId);
            fd.append('modifiedBy', sessionStorage.getItem('userEmail') );

            if (this.empFile != null) {
                fd.append('photoId', this.empFile, this.employeeForm.value.lastName + this.empFile.name)
                if (this.employeeForm.value.empId === "" || this.employeeForm.value.empId == null) {
                    this.empserv.signUpPhoto(fd).subscribe(res => {
                        this.userCreated = true;
                        this.userUpdated = false;
                    },
                        (error) => {
                            if (error.status == 401) {
                                this.router.navigateByUrl('/user');
                            } else {
                                console.log(error.status);
                            }
                        });
                } else {
                    this.empserv.updateUser(fd, this.employeeForm.value.empId).subscribe(res => {
                        this.userUpdated = true;
                        this.userCreated = false;
                    },
                        (error) => {
                            if (error.status == 401) {
                                this.router.navigateByUrl('/user');
                            } else {
                                console.log(error.status);
                            }
                        });
                }
            } else {
                if (this.employeeForm.value.empId === "" || this.employeeForm.value.empId == null) {
                    this.empserv.signUp(fd).subscribe(res => {
                        this.userCreated = true;
                        this.userUpdated = false;
                    },
                        (error) => {
                            if (error.status == 401) {
                                this.router.navigateByUrl('/user');
                            } else {
                                console.log(error.status);
                            }
                        });
                } else {
                    this.empserv.updateUser(fd, this.employeeForm.value.empId).subscribe(res => {
                        this.userUpdated = true;
                        this.userCreated = false;
                    },
                        (error) => {
                            if (error.status == 401) {
                                this.router.navigateByUrl('/user');
                            } else {
                                console.log(error.status);
                            }
                        });
                }
            }
        } else {
            this.error = true;
        }
    }
}