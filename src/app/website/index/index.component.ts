import { Router } from '@angular/router'
import { IAlertService } from './../../libs/ialert/ialerts.service'
import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { DataService } from './data.service'
import * as moment from 'moment'

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    cardlength: any = []
    newsList: any = []
    tournamentSearchList: any = []
    page = 1
    pagination: any
    fetching = true
    dataStatus = 'fetching'
    searchStatus = 'fetching'
    spinnerSVG = `/assets/images/spinner.svg`
    searchLoading = false
    age = [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    filters: any = {
        age_category: '',
        tournament_type: '',
        year: '',
        gender: ''
    }
    date: any
    newsDataStatus='fetching'
    constructor(
        public api: ApiService,
        public alert: IAlertService,
        public ds: DataService,
        private router: Router
    ) {
        this.ds.list().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.cardlength = resp.data
                this.dataStatus = 'done'
            }
        })

        this.ds.newsList().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.newsList = resp.data.slice(0, 2)
                this.newsDataStatus='done'
                // this.newsList = resp.data
            }
        })

        // this.search()
    }

    ngOnInit() {
    }
    scroll(el: HTMLElement) {
        el.scrollIntoView()
    }

    setPagination(page: number) {
        let filtersParam: any = {}
        filtersParam = { page }
        this.router.navigate(['/'], { queryParams: filtersParam, replaceUrl: true })
    }

    tournamentDetail(tournamentId: any,type:any) {
        if (type =='tournament') {
        this.router.navigate(['/tournament-detail'], { queryParams: { id: tournamentId }, replaceUrl: true })
        }
        else if (type =='tour') {
        this.router.navigate(['/tour-detail'], { queryParams: { id: tournamentId }, replaceUrl: true })
        }
    }

    newsDetail(newsId: any) {
        console.log(newsId)
        this.router.navigate(['/news-detail'], { queryParams: { id: newsId }, replaceUrl: true })
    }

    search() {
        const paramsToSend: any = { ...this.filters }
        paramsToSend.year = moment(paramsToSend.year).format('YYYY')

        if (paramsToSend.year === 'Invalid date') {
            paramsToSend.year = ''
        }

        console.log('paramsToSend', paramsToSend)
        if (paramsToSend.tournament_type === 'tour') {
            this.router.navigate(['/tour-list'], { queryParams: paramsToSend, replaceUrl: true })
        }
        if (paramsToSend.tournament_type === 'tournament') {
            this.router.navigate(['/tournament-list'], { queryParams: paramsToSend, replaceUrl: true })
        }
        if (paramsToSend.tournament_type === 'trip') {
            this.router.navigate(['/coaching-trip-list'], { queryParams: paramsToSend, replaceUrl: true })
        }
        // else {
        //     this.router.navigate(['/tournament-list'], { queryParams: paramsToSend, replaceUrl: true })
        // }
    }

    days(date: any) {
        const actualDate = moment(date)
        const currentDate = moment()

        return currentDate.diff(actualDate, 'days')
    }
}
