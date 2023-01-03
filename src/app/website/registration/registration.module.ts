import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: RegistrationComponent }
        ])
    ],
    declarations: [RegistrationComponent]
})
export class RegistrationModule { }
