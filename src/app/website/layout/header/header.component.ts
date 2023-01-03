import { DataService } from './data.service'
import { Router } from '@angular/router'
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown'
import { ApiService } from '../../../services/api.service'
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, HostListener } from '@angular/core'
import { ConstantsService } from 'src/app/services/constants.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HeaderComponent implements OnInit, AfterViewInit {
    isCollapsed = true
    carSubscribe: any
    isAuthenticated = false
    isAdmin = false
    typeList: any = []
    tourList: any = []
    tournamentList: any = []
    dataStatus = 'fetching'

    constructor(
        public api: ApiService,
        public cs: ConstantsService,
        public router: Router,
        public renderer2: Renderer2,
        public ds: DataService
    ) {
        api.userLoggedInObs.subscribe(m => {
            this.isAuthenticated = m
            if (this.isAuthenticated) {
                this.loginUpdates()
            }
        })

        this.ds.list().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.typeList = resp.data
                console.log('tournament', resp.data)
                this.dataStatus = 'done'
            }
        })
    }
    loginUpdates(): void {
        this.isAdmin = this.api.isAdmin()
    }
    ngOnInit() {
    }
    tournamentDetail(tournamentId: any) {
        this.router.navigate(['/tournament-detail'], { queryParams: { id: tournamentId }, replaceUrl: true })
    }
    tourDetail(tourId: any) {
        console.log(tourId)
        this.router.navigate(['/tour-detail'], { queryParams: { id: tourId }, replaceUrl: true })
    }
    ngAfterViewInit() {
    }

    logOut(): void {
        const check = this.api.logOut()
        if (check) {
            location.reload()
        }
    }
}
