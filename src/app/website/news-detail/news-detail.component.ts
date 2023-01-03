import { DataService } from './data.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
    newsId: any
    newsDetail: any = []
    fetching = true
    dataStatus = 'fetching'
    spinnerSVG = `/assets/images/spinner.svg`
    newsContent: any

    constructor(
        private route: ActivatedRoute,
        public ds: DataService,
        public api: ApiService,
    ) {
        this.newsId = this.route.snapshot.queryParamMap.get('id')

        this.ds.newsDetail(this.newsId).subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.newsDetail = resp.data
                const parsedValue = resp.data.content
                if (parsedValue) {
                    this.newsContent = parsedValue
                }
                this.dataStatus = 'done'
                // this.fetching = false
                // console.log('newsDetail', this.newsDetail)
            }
        })
    }

    ngOnInit() {
    }

    days(date: any) {
        const actualDate = moment(date)
        const currentDate = moment()

        return currentDate.diff(actualDate, 'days')
    }

}
