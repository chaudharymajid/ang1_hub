import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatIcon, MatIconModule } from  '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatMenuModule, MatIconModule]
})

export class MaterialModule {}