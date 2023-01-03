import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { DataService } from './data.service'

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
    dataStatus = 'fetching'
    thumbnail: any = '/assets/img/user.jpg'
    spinnerSVG = `/assets/images/spinner.svg`
    deletePop: any
    countryForm: FormGroup
    countryList = []
    selectedIndex: any
    selectedId: any
    modalRef: BsModalRef
    imageChangedEvent: any = ''
    croppedImage: any = ''
    cropperModalRef: BsModalRef
    loaderOptions = {
        rows: 5,
        cols: 4,
        colSpans: {
            0: 1,
        }
    }
    constructor(
        private data: DataService,
        public api: ApiService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {
        this.countryForm = this.fb.group({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            code: new FormControl(null, [Validators.required, Validators.maxLength(50)])
        })
    }

    ngOnInit() {
        this.data.getCountry().subscribe((resp: any) => {
            if (resp.success === true) {
                this.countryList = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    get g() {
        return this.countryForm.controls
    }

    openModalSubject(subjectModal, index) {
        if (index > -1) {
            this.selectedIndex = index
            this.thumbnail = this.api.countryImageUrl(this.countryList[index].id) + '?' + JSON.stringify(new Date())
            this.countryForm.controls.id.setValue(this.countryList[index].id)
            this.countryForm.patchValue(this.countryList[index])
        }
        this.modalRef = this.ms.show(
            subjectModal,
            {
                class: 'modal-lg modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    getImg(imgId: number) {
        const index = this.countryList.findIndex(d => d.id === imgId)
        if (index > -1 && this.countryList[index].timeStamp) {
            return this.api.countryImageUrl(imgId) + '?' + this.countryList[index].timeStamp
        } else {
            return this.api.countryImageUrl(imgId)
        }
    }

    saveCountry(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        const params = {
            id: this.countryForm.value.id,
            name: data.value.name,
            code: data.value.code
        }

        fetch(this.thumbnail)
            .then(res => res.blob())
            .then(blob => {
                const imageFile = new Blob([blob])
                const formData = this.api.jsonToFormData(params)
                formData.append('flag_image', imageFile)


                let saveUpdate = this.data.addCountry(formData)
                if (this.countryForm.value.id !== null) {
                    saveUpdate = this.data.updateCountry(formData)
                }
                saveUpdate.subscribe((resp: any) => {
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)
                        this.modalRef.hide()
                        f.resetForm()


                        return false
                    } else {
                        if (this.countryForm.value.id !== null) {
                            this.alert.success('Changes done successfully!!')
                            const mergeParams = {
                                id: this.countryForm.value.id,
                                name: data.value.name,
                                code: data.value.code,
                                timeStamp: JSON.stringify(new Date())
                            }
                            this.countryList[this.selectedIndex] = mergeParams
                            this.countryForm.controls.id.setValue(null)
                        } else {
                            this.alert.success('Country added successfully!!')
                            const mergeParams = {
                                id: resp.data,
                                name: data.value.name,
                                code: data.value.code,
                            }
                            this.countryList.push(mergeParams)
                        }
                    }
                    this.modalRef.hide()
                    f.resetForm()
                })
            })
    }

    deleteCountry() {
        const params = {
            id: this.selectedId
        }
        this.data.deleteCountry(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.deletePop.hide()

                    return false
                } else {
                    const deletingIndex = this.countryList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.countryList.splice(deletingIndex, 1)
                    this.deletePop.hide()
                    this.alert.success('Country deleted successfully!!')
                }
            })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelCountryButton(f: any) {
        f.resetForm()
        console.log('Form is Reset Now')
        this.modalRef.hide()
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
