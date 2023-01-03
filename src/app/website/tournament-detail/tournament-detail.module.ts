import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TournamentDetailComponent } from './tournament-detail.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LightboxModule } from 'ngx-lightbox'

@NgModule({
    imports: [
        CommonModule,
        LazyLoadImageModule,
        ReactiveFormsModule,
        FormsModule,
        LightboxModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: TournamentDetailComponent
            }
        ])
    ],
    declarations: [TournamentDetailComponent],
    providers: [DataService]
})
export class TournamentDetailModule { }
