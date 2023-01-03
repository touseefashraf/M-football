import { IAlertService } from '../../../libs/ialert/ialerts.service'
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, TemplateRef } from '@angular/core'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { UIHelpers } from '../../../helpers/ui-helpers'
import { ApiService } from '../../../services/api.service'
import { DataService } from './data.service'
import * as moment from 'moment'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ImageCroppedEvent } from 'ngx-image-cropper'
@Component({
    selector: 'app-addedit',
    templateUrl: './addedit.component.html',
    styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit, OnDestroy {
    fetching = false
    moment = moment
    minDate = new Date()
    // dataService.selectedId: any
    selectedIndex = -1
    newsForm: FormGroup
    newsDetails: any
    operations = 'sale'
    dataStatus = 'fetching'
    public searchControl: FormControl
    imageChangedEvent: any = ''
    croppedImage: any = ''
    cropperModalRef: BsModalRef
    modalRef: BsModalRef
    deletePop: any
    thumbnail: any = '/assets/img/user.jpg'
    age = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

    constructor(
        public fb: FormBuilder,
        public dataService: DataService,
        public ui: UIHelpers,
        public api: ApiService,
        private alert: IAlertService,
        private route: ActivatedRoute,
        private router: Router,
        public ms: BsModalService
    ) {
        this.newsForm = this.fb.group({
            id: new FormControl(null, []),
            name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            start_date: new FormControl(null, [Validators.required]),
            born_after: new FormControl(null, [Validators.required]),
            end_date: new FormControl(null, [Validators.required]),
            tournament_type: new FormControl('tournament', [Validators.required]),
            level: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            age_category: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            gender: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            highlights: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            location: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            about_madrid: new FormControl(null, [Validators.maxLength(1000)]),
            day_one_itinerary: new FormControl(null, [Validators.maxLength(1000)]),
            day_two_itinerary: new FormControl(null, [Validators.maxLength(1000)]),
            day_three_itinerary: new FormControl(null, [Validators.maxLength(1000)]),
            day_four_itinerary: new FormControl(null, [Validators.maxLength(1000)]),
            day_five_itinerary: new FormControl(null, [Validators.maxLength(1000)]),
            description: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
        })
        this.route.queryParams.subscribe((params: any) => {
            if (params.id) {
                this.dataService.selectedId = params.id
            }
        })
        if (this.dataService.selectedId > -1) {
            this.initialize(this.dataService.selectedId)
        } else {

            this.dataStatus = 'done'
        }
    }
    get g() {
        return this.newsForm.controls
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.dataService.step = 1
    }

    initialize(val: number) {
        const params = {
            id: val
        }

        this.dataService.getDetails(params).subscribe((resp: any) => {
            if (resp.success == true) {
                this.newsDetails = resp.data
                this.dataService.newsDetails = resp.data
                this.newsForm.patchValue(this.newsDetails)
                this.thumbnail = this.api.tournamentThumbnailUrl(resp.data.id)
                this.newsForm.controls.start_date.setValue(new Date(this.newsForm.value.start_date))
                this.newsForm.controls.end_date.setValue(new Date(this.newsForm.value.end_date))
                this.dataStatus = 'done'
            }
        })
    }

    save(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        data.value.start_date = moment(data.value.start_date).format('YYYY-MM-DD')
        data.value.end_date = moment(data.value.end_date).format('YYYY-MM-DD')
        data.value.born_after = moment(data.value.born_after).format('YYYY-MM-DD')
        const params = data.value

        console.log('data', data.value)


        let saveMethod = this.dataService.save(data.value)
        if (data.value.id > 0) {
            saveMethod = this.dataService.update(data.value)
        }

        saveMethod.subscribe((resp: any) => {

            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                if (this.dataService.selectedId > '-1') {
                    this.dataService.step = 2
                    data.value.id = +this.dataService.selectedId
                    this.router.navigate(['/admin/tournaments/publish'], { queryParams: { id: data.value.id }, replaceUrl: true })
                    this.alert.success('Changes saved successfully!!')
                } else {
                    this.dataService.selectedId = resp.data
                    this.dataService.newsDetails.id = resp.data
                    this.dataService.newsDetails.tournament_images = []
                    this.dataService.newsDetails.tournament_teams = []
                    this.alert.success('Added successfully')
                    this.dataService.step = 2
                    this.router.navigate(['/admin/tournaments/publish'], { queryParams: { id: resp.data }, replaceUrl: true })
                }
            }
        })



    }

    setOperation(value: any): void {
        this.operations = value
        this.newsForm.controls.operation.setValue(value)

    }

    cancel() {
        this.router.navigateByUrl('/admin/project/list')
    }
    browseThumbnail(event: any) {
        event.preventDefault()
        const element = document.getElementById('thumbnail-image')
        element.click()
    }

    onThumbnailChange(event: any, template: TemplateRef<any>) {
        const file = event.target.files[0]
        const allowedExtensions = ['png', 'jpg', 'jpeg']
        const extension = file.name.split('.').pop().toLowerCase()
        const fileSize = file.size / 1024 / 1024
        if (fileSize > 3) {
            this.alert.error('Invalid file size. File size must not exceeds 3MB')
        } else if (allowedExtensions.indexOf(extension) < 0) {
            this.alert.error('Invalid file type. Only png, jpg or jpeg are allowed')
        } else {
            this.imageChangedEvent = event
            this.cropperModalRef = this.ms.show(
                template,
                Object.assign({}, { class: 'modal-md modal-dialog-centered admin-panel' })
            )
        }
    }

    doneCroppingThumbnail() {
        this.thumbnail = this.croppedImage
        document.getElementById('banner-img').setAttribute('src', this.thumbnail)
        this.cropperModalRef.hide()
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64
    }

    // companyImageCropped(event: ImageCroppedEvent) {
    //     this.croppedCompanyImage = event.base64
    // }

    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}
