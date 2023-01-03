import { DataService } from './data.service'
import { RouterModule, Routes } from '@angular/router'
import { NgModule, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoachingTipsComponent } from './coaching-tips.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import {LazyLoadImageModule} from 'ng-lazyload-image'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LightboxModule } from 'ngx-lightbox'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LazyLoadImageModule,
        LightboxModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: CoachingTipsComponent
            }
        ])
    ],
    declarations: [CoachingTipsComponent],
    providers:[DataService]
})
export class CoachingTipsModule { }
