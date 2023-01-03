import { LazyLoadImageModule } from 'ng-lazyload-image'
import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewsComponent } from './news.component'

@NgModule({
    imports: [
        CommonModule,
        LazyLoadImageModule,
        RouterModule.forChild([
            { path: '', component: NewsComponent }
        ])
    ],
    declarations: [NewsComponent],
    providers: [DataService]
})
export class NewsModule { }
