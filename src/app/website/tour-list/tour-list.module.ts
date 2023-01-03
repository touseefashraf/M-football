import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TourListComponent } from './tour-list.component'
import { DataService } from './data.service'
import { SharedModule } from '../shared/shared.module'
import { AdminSharedModule } from 'src/app/admin-panel/admin-shared/admin-shared.module'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AdminSharedModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: TourListComponent }
        ])
    ],
    declarations: [TourListComponent],
    providers: [DataService]
})
export class TourListModule { }
