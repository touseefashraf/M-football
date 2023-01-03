import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { DataService } from './data.service'
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: TermsAndConditionsComponent }
        ])
    ],
    providers: [DataService],
    declarations: [TermsAndConditionsComponent],
    exports: [TermsAndConditionsComponent]
})
export class TermsAndConditionsModule { }
