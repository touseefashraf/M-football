import { DataService } from './data.service'
import { ActivatedRoute, Params } from '@angular/router'
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import * as moment from 'moment'
import { interval, Subscription } from 'rxjs'
import { Lightbox } from 'ngx-lightbox'


@Component({
    selector: 'app-tournament-detail',
    templateUrl: './tournament-detail.component.html',
    styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
    tourForm: FormGroup
    tournamentId: any
    tournamentDetailList: any = []
    dataStatus = 'fetching'
    spinnerSVG = `/assets/images/spinner.svg`
    newsList: any = []
    Loading = false

    subscription: Subscription
    moment = moment

    endDate: any
    dateNow = new Date()
    dDay: any
    // dDay = new Date(this.endDate)
    milliSecondsInASecond = 1000
    hoursInADay = 24
    minutesInAnHour = 60
    SecondsInAMinute = 60

    timeDifference: any
    secondsToDday: any
    minutesToDday: any
    hoursToDday: any
    daysToDday: any

    albums: Array<any> = []
    newsResp: any = []
    newsDataStatus='fetching'

    constructor(
        public ui: UIHelpers,
        private fb: FormBuilder,
        private alert: IAlertService,
        public route: ActivatedRoute,
        public ds: DataService,
        public api: ApiService,
        private lightbox: Lightbox
    ) {
        this.tourForm = this.fb.group({

            name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
            email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(40)]),
            contact_no: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
            club: new FormControl(null, [Validators.required]),
            team: new FormControl(null, [Validators.required]),
            function: new FormControl(null, [Validators.required]),
            parents: new FormControl(null, [Validators.required]),
            staff: new FormControl(null, [Validators.required]),
            players: new FormControl(null, [Validators.required]),
            from_date: new FormControl(null, [Validators.required]),
            to_date: new FormControl(null, [Validators.required]),
            strm: new FormControl(0),
            stam: new FormControl(0),
            sm: new FormControl(0),
            ccs: new FormControl(0),
            vpm: new FormControl(0),
            description: new FormControl(null, [Validators.maxLength(50)]),


        })

        this.route.queryParams.subscribe((param: Params) => {
            if (param.id) {
                this.tournamentId = param.id
                console.log(this.tournamentId)
                this.getData(this.tournamentId)
                this.getNews()
            }
        })

        // this.tournamentId = this.route.snapshot.queryParamMap.get('id')
        // console.log('tournamentId', this.tournamentId)

    }
    getData(tournamentId) {
        this.ds.tournamentDetails(tournamentId).subscribe((resp: any) => {
            if (resp.success) {
                this.tournamentDetailList = resp.data
                this.dDay = new Date(resp.data.end_date)
                this.dataStatus = 'done'
                // this.dDay = Date.parse(resp.data.end_date)
                // console.log('endDate', new Date(resp.data.end_date))
                // console.log('dDay', this.dDay)
                // console.log('dateNow', this.dateNow)
                // console.log('Tournament Details', this.tournamentDetailList)

                this.subscription = interval(1000).subscribe(x => {
                    this.getTimeDifference()
                })
            } else {
                console.log('Tournament Details INVALID')
            }
        })
    }
    getNews() {
        this.newsDataStatus='fetching'
        this.ds.newsList().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.newsResp = resp.data
                this.newsList=[]
                this.newsDataStatus='done'
                this.newsResp.forEach((news: any) => {
                    if (news.tournament_id == this.tournamentId) {
                        this.newsList.push(news)
                    }
                })
                if (this.newsList.length > 4) {
                    this.newsList = this.newsList.slice(0, 4)
                    console.log('top 4 new', this.newsList)
                } else{
                    console.log('all news are', this.newsList);
                }

            }
        })
    }

    getTimeDifference() {
        this.timeDifference = this.dDay.getTime() - this.dateNow.getTime()
        this.allocateTimeUnits(this.timeDifference)
    }

    allocateTimeUnits(timeDifference) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute)
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute)
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay)
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay))
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
    get g() {
        return this.tourForm.controls
    }
    save(data: any, f: any) {
        console.log(data)
        this.Loading = true
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.Loading = false

            return false
        }
        const params = data.value
        params.tournament_id = this.tournamentId
        params.from_date = moment(this.tourForm.value.from_date).format('YYYY-MM-DD').toString()
        params.to_date = moment(this.tourForm.value.to_date).format('YYYY-MM-DD').toString()
        console.log(params)


        this.ds.savetourDetails(params).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.Loading = false

                return false
            } else {
                this.Loading = false
                console.log(resp.data)
                this.alert.success('Request sent Successfully')
                f.resetForm()

            }
        })

    }
    scroll(el: HTMLElement) {
        el.scrollIntoView()
    }

    openGallery(images: any) {
        this.albums = []

        images.forEach(d => {
            const imageData = {
                src: this.ds.mfaImages(d.id),
                caption: '',
                thumb: this.ds.mfaImages(d.id)
            }
            this.albums.push(imageData)
        })

        this.open(0)
    }
    open(index: number): void {
        // open lightbox
        this.lightbox.open(this.albums, index, {
            alwaysShowNavOnTouchDevices: true,
            disableScrolling: true,
            albumLabel: '',
            wrapAround: true,
            showImageNumberLabel: true,
            centerVertically: true
        })
    }

}
