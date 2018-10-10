import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIcon, MatIconModule, MatFormField, MatFormFieldModule, MatOptionModule,
MatSelectModule } from  '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatOptionModule, MatSelectModule]
})

export class MaterialModule {}