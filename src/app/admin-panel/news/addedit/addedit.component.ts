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
    tournamentsList: any = []
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
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            tournament_id: new FormControl(null),
            date: new FormControl(null, [Validators.required]),
            summary: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
            // content: new FormControl(null, [Validators.required])

        })

        this.route.queryParams.subscribe((params: any) => {
            if (params.id) {
                this.dataService.selectedId = params.id
                console.log('id', params.id)
                console.log('id dataService', this.dataService.selectedId)
            }
        })
        if (this.dataService.selectedId > -1) {
            console.log('id is', this.dataService.selectedId)
            this.initialize(this.dataService.selectedId)
        } else {

            // this.dataStatus = 'done'
        }
        this.dataService.list().subscribe((resp: any) => {
            if (resp.success === false) {
                return false
            } else {
                this.tournamentsList = resp.data
                console.log('tournament', resp.data)
                this.dataStatus = 'done'
            }
        })

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
        this.dataService.getDetails(val).subscribe((resp: any) => {
            if (resp.success == true) {
                this.newsDetails = resp.data
                this.dataService.newsDetails = resp.data
                this.newsForm.patchValue(this.newsDetails)
                this.thumbnail = this.api.newsThumbnailUrl(resp.data.id)
                this.newsForm.controls.date.setValue(new Date(this.newsForm.value.date))
                this.dataStatus = 'done'
            }
        })
    }

    save(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        data.value.date = moment(data.value.date).format('YYYY-MM-DD')
        const params = data.value

        fetch(this.thumbnail)
            .then(res => res.blob())
            .then(blob => {
                const imageFile = new Blob([blob])
                const formData = this.api.jsonToFormData(params)
                formData.append('news_thumbnail', imageFile)


                let saveUpdate = this.dataService.save(formData)
                if (this.dataService.selectedId > -1) {
                    console.log('id is1', this.dataService.selectedId)
                    console.log(this.dataService.selectedId)
                    formData.append('id', this.dataService.selectedId)
                    saveUpdate = this.dataService.update(formData)
                }
                saveUpdate.subscribe((resp: any) => {
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)

                        return false
                    } else {
                        this.dataService.step = 2
                        if (this.dataService.selectedId > '-1') {
                            data.value.id = +this.dataService.selectedId
                            this.router.navigate(['/admin/news/publish'], { queryParams: { id: data.value.id }, replaceUrl: true })
                        } else {
                            this.dataService.selectedId = resp.data
                            this.dataService.newsDetails.id = resp.data
                            this.dataService.newsDetails.news_images = []
                            this.alert.success('Added successfully')
                            this.router.navigate(['/admin/news/publish'], { queryParams: { id: resp.data }, replaceUrl: true })
                        }
                    }
                })
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
