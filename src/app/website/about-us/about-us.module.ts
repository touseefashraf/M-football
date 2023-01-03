import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutUsComponent } from './about-us.component'
import { AdminSharedModule } from 'src/app/admin-panel/admin-shared/admin-shared.module'
import { SharedModule } from '../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    imports: [
        CommonModule,
        AdminSharedModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: AboutUsComponent }
        ])
    ],
    declarations: [AboutUsComponent],
    providers: [DataService]
})
export class AboutUsModule { }
