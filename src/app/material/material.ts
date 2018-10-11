import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIcon, MatIconModule, MatFormField, MatFormFieldModule, MatOptionModule,
MatSelectModule, MatDatepickerModule, MatNativeDateModule } from  '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatDatepickerModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatDatepickerModule],
    providers:[MatDatepickerModule]
})

export class MaterialModule {}