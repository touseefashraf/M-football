import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { DataService } from './data.service'
import * as moment from 'moment'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    latestList: any = []
    previousList: any = []
    spinnerSVG = `/assets/images/spinner.svg`
    dataStatus = 'fetching'

    constructor(
        public api: ApiService,
        public alert: IAlertService,
        public ds: DataService,
        private router: Router
    ) {
        this.ds.newsList().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.latestList = resp.data
                // this.previousList = resp.data.slice(2, 5)
                this.dataStatus = 'done'
                // console.log('newsList', this.latestList)
                // console.log('previousList', this.previousList)
            }
        })
    }

    ngOnInit() {
    }

    newsDetail(newsId: any) {
        console.log(newsId)
        this.router.navigate(['/news-detail'], { queryParams: { id: newsId }, replaceUrl: true })
    }

    days(date: any) {
        const actualDate = moment(date)
        const currentDate = moment()

        return currentDate.diff(actualDate, 'days')
    }
}
