import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service'
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PrivacyComponent
            }
        ])
    ],
    providers: [DataService],
    declarations: [PrivacyComponent]
})
export class PrivacyModule { }
