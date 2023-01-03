import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';
import { RouterModule } from '@angular/router';
import { DataService } from './data.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LightboxModule } from 'ngx-lightbox';


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
                component: ToursComponent
            }
        ])
    ],
    declarations: [ToursComponent],
    providers: [DataService]
})
export class ToursModule { }
