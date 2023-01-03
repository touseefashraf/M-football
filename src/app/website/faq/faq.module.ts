import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FaqComponent } from './faq.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: FaqComponent }
        ])
    ],
    declarations: [FaqComponent],
    providers: [DataService]
})
export class FaqModule { }
