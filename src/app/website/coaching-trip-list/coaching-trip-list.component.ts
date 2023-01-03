import { ActivatedRoute, Router } from '@angular/router';
import { IAlertService } from './../../libs/ialert/ialerts.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-coaching-trip-list',
    templateUrl: './coaching-trip-list.component.html',
    styleUrls: ['./coaching-trip-list.component.css']
})
export class CoachingTripListComponent implements OnInit {
    tripList: any = []
    dataStatus = 'fetching'
    filters: any = {
        age_category: '',
        tournament_type: 'trip',
        date: '',
        gender: ''
    }
    spinnerSVG = `/assets/images/spinner.svg`
    resetSearch: any = false
    constructor(
        public ds: DataService,
        public alert: IAlertService,
        private router: Router,
        public api: ApiService,
        public route: ActivatedRoute
    ) {
        this.filters.age_category = this.route.snapshot.queryParamMap.get('age_category')
        this.filters.tournament_type = this.route.snapshot.queryParamMap.get('tournament_type')
        this.filters.date = this.route.snapshot.queryParamMap.get('date')
        this.filters.gender = this.route.snapshot.queryParamMap.get('gender')
        if(this.filters.age_category || this.filters.year || this.filters.gender) {
            this.resetSearch = true
        }
        const paramsToSend: any = { ...this.filters }

        // console.log('paramsToSend', paramsToSend)
        if (paramsToSend.tournament_type === null) {
            paramsToSend.tournament_type = 'trip'
        }
        // console.log('paramsToSend', paramsToSend)

        this.ds.tourList(paramsToSend).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.tripList = resp.data
                this.dataStatus = 'done'

                this.router.navigate(['/coaching-trip-list'], { queryParams: paramsToSend, replaceUrl: true })
            }
        })
    }

    ngOnInit() {
    }

    tripDetail(tripId: any, type: any) {
        this.router.navigate(['/coaching-trips'], { queryParams: { id: tripId }, replaceUrl: true })
    }
    reset() {
        this.filters = {
            age_category: '',
            tournament_type: 'trip',
            year: '',
            gender: ''
        }

        // const paramsToSend: any = { ...this.filters }
        // if (paramsToSend.tournament_type === 'tournament') {
        //     this.router.navigate(['/tournament-list'], { queryParams: paramsToSend, replaceUrl: true })
        // }
        window.location.href = '/coaching-trip-list'
    }
}
