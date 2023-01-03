import { ConstantsService } from './../../services/constants.service';
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { DataService } from './data.service'
import * as moment from 'moment'
import { Lightbox } from 'ngx-lightbox'


@Component({
    selector: 'app-tours',
    templateUrl: './tours.component.html',
    styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {
    dateFormat: any
    tourForm: FormGroup
    tourId: any
    tourDetailList: any = []
    dataStatus = 'fetching'
    spinnerSVG = `/assets/images/spinner.svg`
    newsList: any
    Loading = false
    albums: Array<any> = []
    moment = moment
    constructor(
        public ui: UIHelpers,
        private fb: FormBuilder,
        private alert: IAlertService,
        public route: ActivatedRoute,
        public ds: DataService,
        public api: ApiService,
        public cs: ConstantsService,
        private lightbox: Lightbox
    ) {
        this.dateFormat = this.cs.DATE_TIME_FORMAT.SHORT_DATE
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
                this.tourId = param.id
                console.log(this.tourId)
                this.getData(this.tourId)
            }
        })
        // this.tourId = this.route.snapshot.queryParamMap.get('id')
        // console.log('tourId', this.tourId)


        // this.ds.newsList().subscribe((resp: any) => {
        //     if (resp.success === false) {
        //         return false
        //     } else {
        //         this.newsList = resp.data.splice(0, 2)
        //         console.log('newsList', this.newsList)
        //     }
        // })
    }

    ngOnInit() {
    }
    getData(tourId) {
        this.ds.tourDetails(tourId).subscribe((resp: any) => {
            if (resp.success) {
                this.tourDetailList = resp.data
                this.dataStatus = 'done'
                console.log('Tour Details', this.tourDetailList)
            } else {
                console.log('Tour Details INVALID')
            }
        })
    }
    scroll(el: HTMLElement) {
        el.scrollIntoView()
    }
    get g() {
        return this.tourForm.controls
    }
    save(data: any, f: any) {
        // console.log(data)
        this.Loading = true
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.Loading = false

            return false
        }
        const params = data.value
        params.tournament_id = this.tourId
        params.from_date = moment(this.tourForm.value.from_date).format('YYYY-MM-DD').toString()
        params.to_date = moment(this.tourForm.value.to_date).format('YYYY-MM-DD').toString()
        // console.log(params)


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
