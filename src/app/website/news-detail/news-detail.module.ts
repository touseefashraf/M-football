import { SharedModule } from 'src/app/website/shared/shared.module'
import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewsDetailComponent } from './news-detail.component'
import { LazyLoadImageModule } from 'ng-lazyload-image'

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: NewsDetailComponent }
        ])
    ],
    declarations: [NewsDetailComponent],
    providers: [DataService]
})
export class NewsDetailModule { }
