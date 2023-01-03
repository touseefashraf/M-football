import { DataService } from './data.service'
import { AdminSharedModule } from './../admin-shared/admin-shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FaqsComponent } from './faqs.component'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { SharedModule } from 'src/app/website/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [
        CommonModule,
        AdminSharedModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        RouterModule.forChild([
            { path: '', component: FaqsComponent }
        ])
    ],
    declarations: [FaqsComponent],
    providers: [DataService]
})
export class FaqsModule { }
