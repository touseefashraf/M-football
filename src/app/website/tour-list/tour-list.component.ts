import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { DataService } from './data.service'

@Component({
    selector: 'app-tour-list',
    templateUrl: './tour-list.component.html',
    styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
    tourList: any = []
    dataStatus = 'fetching'
    filters: any = {
        age_category: '',
        tournament_type: 'tour',
        year: '',
        gender: ''
    }
    spinnerSVG = `/assets/images/spinner.svg`
    resetSearch:any = false
    constructor(
        public ds: DataService,
        public alert: IAlertService,
        private router: Router,
        public api: ApiService,
        public route: ActivatedRoute
    ) {
        
    }

    ngOnInit() {
         this.filters.age_category = this.route.snapshot.queryParamMap.get('age_category')
         this.filters.tournament_type = this.route.snapshot.queryParamMap.get('tournament_type')
         this.filters.year = this.route.snapshot.queryParamMap.get('year')
         this.filters.gender = this.route.snapshot.queryParamMap.get('gender')
         this.route.queryParams.subscribe(params => {

            if (params.age_category) {
                this.filters.age_category = params.age_category
            } else {
                this.filters.age_category = ''
            }

            if (params.tournament_type) {
                this.filters.tournament_type = params.tournament_type
            } else {
                this.filters.tournament_type = 'tour'
            }

            if (params.year) {
                this.filters.year = params.year
            } else {
                this.filters.year = ''
            }

            if (params.gender) {
                this.filters.gender = params.gender
            } else {
                this.filters.gender = ''
            }
         } );  

        // this.route.params.subscribe((params) => {
        //     this.filters.age_category = params.age_category
        //     this.filters.tournament_type = params.tournament_type
        //     this.filters.year = params.year
        //     this.filters.gender = params.gender
        //   });
        if(this.filters.age_category || this.filters.year || this.filters.gender) {
            this.resetSearch = true
        }
        const paramsToSend: any = { ...this.filters }

        // console.log('paramsToSend', paramsToSend)
        if (paramsToSend.tournament_type === null) {
            paramsToSend.tournament_type = 'tour'
        }
        // console.log('paramsToSend', paramsToSend)

        this.ds.tourList(paramsToSend).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.tourList = resp.data
                this.dataStatus = 'done'

                this.router.navigate(['/tour-list'], { queryParams: paramsToSend, replaceUrl: true })
            }
        })
    
    }

    tourDetail(tourId: any, type: any) {
        this.router.navigate(['/tour-detail'], { queryParams: { id: tourId }, replaceUrl: true })
        // if (type === 'tour') {
        //     this.router.navigate(['/tours'], { queryParams: { id: tourId }, replaceUrl: true })
        // } else {
        //     this.router.navigate(['/tournament-detail'], { queryParams: { id: tourId }, replaceUrl: true })
        // }
    }
    reset() {
        this.filters = {
            age_category: '',
            tournament_type: 'tour',
            year: '',
            gender: ''
        }

        // const paramsToSend: any = { ...this.filters }
        // if (paramsToSend.tournament_type === 'tour') {
        //     this.router.navigate(['/tour-list'], { queryParams: paramsToSend, replaceUrl: true })
        // }
        window.location.href = '/tour-list'
    }
}
