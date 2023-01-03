import { AdminSharedModule } from './../../admin-shared/admin-shared.module';
import { List } from './list.component'
import { IAlertsModule } from '../../../libs/ialert/ialerts.module'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { ModalModule } from 'ngx-bootstrap/modal'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ImageCropperModule } from 'ngx-image-cropper'
import { ReactiveFormsModule } from '@angular/forms'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { DataService } from './data.service'
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/website/shared/shared.module';

@NgModule({
    imports: [
        ImageCropperModule,
        CommonModule,
        AdminSharedModule,
        SharedModule,
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        IAlertsModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: List }
        ])
    ],
    declarations: [List],
    providers: [DataService]
})
export class ListModule { }
