import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepicker,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule, 
    ErrorStateMatcher, 
    ShowOnDirtyErrorStateMatcher, 
    MatCheckboxModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatDatepickerModule,
        MatToolbarModule, MatCardModule, BrowserAnimationsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSlideToggleModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatDatepickerModule,
        MatToolbarModule, MatCardModule, BrowserAnimationsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSlideToggleModule],
    providers: [MatDatepickerModule]
})

export class MaterialModule { }