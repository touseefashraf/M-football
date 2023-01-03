import { ImageComponent } from './image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/website/shared/shared.module'
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
            { path: '', component: ImageComponent }
        ]),
        ChartsModule,
    ],
    declarations: [ImageComponent],
    providers: [ DataService ]
})
export class ImageModule { }
