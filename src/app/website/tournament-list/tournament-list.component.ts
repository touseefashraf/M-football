import { ActivatedRoute, Router } from '@angular/router'
import { IAlertService } from './../../libs/ialert/ialerts.service'
import { DataService } from './data.service'
import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-tournament-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
    tournamentList: any = []
    dataStatus = 'fetching'
    filters: any = {
        age_category: '',
        tournament_type: 'tournament',
        year: '',
        gender: ''
    }
    spinnerSVG = `/assets/images/spinner.svg`
    resetSearch = false
    constructor(
        public ds: DataService,
        public alert: IAlertService,
        private router: Router,
        public api: ApiService,
        private route: ActivatedRoute

    ) {
        this.filters.age_category = this.route.snapshot.queryParamMap.get('age_category')
        this.filters.tournament_type = this.route.snapshot.queryParamMap.get('tournament_type')
        this.filters.year = this.route.snapshot.queryParamMap.get('year')
        this.filters.gender = this.route.snapshot.queryParamMap.get('gender')

        if(this.filters.age_category || this.filters.year || this.filters.gender) {
            this.resetSearch = true
        }
        const paramsToSend: any = { ...this.filters }

        // console.log('paramsToSend', paramsToSend)
        if (paramsToSend.tournament_type === null) {
            paramsToSend.tournament_type = 'tournament'
        }
        // console.log('paramsToSend', paramsToSend)

        this.ds.tournamentList(paramsToSend).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.tournamentList = resp.data
                this.dataStatus = 'done'

                this.router.navigate(['/tournament-list'], { queryParams: paramsToSend, replaceUrl: true })
            }
        })
    }

    ngOnInit() {
    }

    tournamentDetail(tournamentId: any) {
        this.router.navigate(['/tournament-detail'], { queryParams: { id: tournamentId }, replaceUrl: true })
    }
    reset() {
        this.filters = {
            age_category: '',
            tournament_type: 'tournament',
            year: '',
            gender: ''
        }

        // const paramsToSend: any = { ...this.filters }
        // if (paramsToSend.tournament_type === 'tournament') {
        //     this.router.navigate(['/tournament-list'], { queryParams: paramsToSend, replaceUrl: true })
        // }
        window.location.href = '/tournament-list'
    }
}
