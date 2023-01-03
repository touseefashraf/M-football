import { LazyLoadImageModule } from 'ng-lazyload-image'
import { AdminSharedModule } from './../../admin-panel/admin-shared/admin-shared.module'
import { SharedModule } from './../shared/shared.module'
import { RouterModule } from '@angular/router'
import { DataService } from './data.service'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoachingTripListComponent } from './coaching-trip-list.component'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AdminSharedModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: CoachingTripListComponent }
        ])
    ],
    declarations: [CoachingTripListComponent],
    providers: [DataService]
})
export class CoachingTripListModule { }
