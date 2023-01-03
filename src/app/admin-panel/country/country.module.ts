import { RouterModule } from '@angular/router'
import { DataService } from './data.service'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CountryComponent } from './country.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal'
import { SharedModule } from 'src/app/website/shared/shared.module'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { LazyLoadImageModule } from 'ng-lazyload-image'

@NgModule({
    imports: [
        CommonModule,
        LazyLoadImageModule,
        AdminSharedModule,
        PopoverModule.forRoot(),
        SharedModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        ImageCropperModule,
        RouterModule.forChild([
            { path: '', component: CountryComponent }
        ])
    ],
    declarations: [CountryComponent],
    providers: [DataService]
})
export class CountryModule { }
