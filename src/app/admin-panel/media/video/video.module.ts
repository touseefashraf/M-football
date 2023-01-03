import { SharedModule } from './../../../website/shared/shared.module';
import { VideoComponent } from './video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { ChartsModule } from 'ng2-charts';
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: VideoComponent }
        ]),
        ChartsModule,
    ],
    declarations: [VideoComponent],
    providers: [ DataService ]
})
export class VideoModule { }
