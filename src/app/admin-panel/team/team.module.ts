import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamComponent } from './team.component'
import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { SharedModule } from 'src/app/website/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal'
import { ImageCropperModule } from 'ngx-image-cropper'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { PopoverModule } from 'ngx-bootstrap/popover'
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
            { path: '', component: TeamComponent }
        ])
    ],
    declarations: [TeamComponent],
    providers: [DataService]
})
export class TeamModule { }
