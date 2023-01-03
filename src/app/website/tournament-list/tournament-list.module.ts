import { DataService } from './data.service'
import { SharedModule } from './../shared/shared.module'
import { AdminSharedModule } from './../../admin-panel/admin-shared/admin-shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TournamentListComponent } from './tournament-list.component'
import { RouterModule } from '@angular/router'
import { LazyLoadImageModule } from 'ng-lazyload-image'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AdminSharedModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: TournamentListComponent }
        ])
    ],
    declarations: [TournamentListComponent],
    providers: [DataService]
})
export class TournamentListModule { }
