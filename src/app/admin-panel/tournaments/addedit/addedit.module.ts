import { TeamsComponent } from './teams/teams.component';
import { AdminSharedModule } from '../../admin-shared/admin-shared.module';
import { ImagesComponent } from './images/images.component'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { StepsTemplateComponent } from './steps-template/steps-template.component'
import { DataService } from './data.service'
import { NgModule } from '@angular/core'
import { AddeditComponent } from './addedit.component'
import { ImageCropperModule } from 'ngx-image-cropper'
import { SharedModule } from '../../../website/shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { AgmCoreModule } from '@agm/core'
import { apis } from '../../../../environments/environment'
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

@NgModule({
    imports: [
        ImageCropperModule,
        SharedModule,
        AdminSharedModule,
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ReactiveFormsModule,
        LazyLoadImageModule,
        BsDatepickerModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: apis.googleApiKey,
            libraries: ['places']
        }),
        RouterModule.forChild([
            { path: '', component: AddeditComponent }
        ])
    ],
    declarations: [
        AddeditComponent,
        ImagesComponent,
        TeamsComponent,
        StepsTemplateComponent,
    ],
    providers: [DataService]
})
export class AddeditModule { }