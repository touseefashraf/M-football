import { DataService } from '../data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit, Input, OnDestroy, TemplateRef, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../../../services/api.service'
import { IAlertService } from '../../../../libs/ialert/ialerts.service'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import * as moment from 'moment'

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    moment = moment
    imageChangedEvent: any = ''
    cropperModalRef: BsModalRef
    croppedImage: any = ''
    thumbnail: any = ''
    s2 = true
    s3 = false
    s4 = false
    @Input() modalRef: BsModalRef
    @Input() index: number
    uploadedFiles = []
    tournamentId: number
    spinnerSVG = `/assets/images/spinner.svg`
    mRef: BsModalRef
    deletionIds: any = []
    markAsNew: any = []
    sub: any
    image: any
    constructor(
        public api: ApiService,
        public dataService: DataService,
        private modalService: BsModalService,
        private alert: IAlertService,
        private router: Router,
        public ms: BsModalService
    ) {
        this.dataService.newsDetails.image = 'yes'
        this.image = this.dataService.newsDetails.image
        this.spinnerSVG = `/assets/images/spinner.svg`
    }

    ngOnInit() {
        this.tournamentId = this.dataService.newsDetails.id
        if (this.image == 'yes') {
            this.thumbnail = this.api.tournamentThumbnailUrl(this.dataService.newsDetails.id)
        }
        if (this.dataService.newsDetails.tournament_images) {
            this.dataService.newsDetails.tournament_images.forEach((file: any) => {

                this.uploadedFiles.push({
                    id: file.id,
                    tournament_id: this.tournamentId,
                    name: file.name,
                    size: file.size
                })

            })
        }
    }
    step3() {
        this.s2 = false
        this.s3 = true
        this.s4 = false
    }
    step4() {
        this.s2 = false
        this.s3 = false
        this.s4 = true
    }
    openConfirmingModal(modal: TemplateRef<any>) {
        this.mRef = this.modalService.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    openSelectedConfirmingModal(modal: TemplateRef<any>) {
        this.mRef = this.modalService.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    onDocumentChange(event: any) {
        this.uploadFiles(event.target.files)
    }

    uploadFiles(files: FileList) {
        const allowedExtensions = ['png', 'jpg', 'jpeg']
        const defaulterFiles = []

        Array.from(files).forEach((file: any) => {
            const extension = file.name.split('.').pop().toLowerCase()
            if (allowedExtensions.indexOf(extension) > -1) {
                this.readFile(file)
            } else {
                defaulterFiles.push(file.name)
                this.alert.error(`${file.name} has an invalid file type. Only jpg, png are allowed`)
            }
        })
    }

    readFile(file: any) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e: any) => {
            const index = this.uploadedFiles.length
            this.uploadedFiles.push({
                id: -1,
                file: reader.result,
                uploading: true
            })
            this.uploadDocument(reader.result, index, file)
        }
    }

    uploadDocument(fileData: any, index: number, file: any) {
        fetch(fileData)
            .then(res => res.blob())
            .then(blob => {
                const myFile = new Blob([blob]) // for microsoft edge support
                const formData = new FormData()
                formData.append('name', file.name)
                formData.append('tournament_image', myFile)
                formData.append('tournament_id', this.dataService.newsDetails.id.toString())
                this.dataService.uploadFile(formData).subscribe((resp: any) => {
                    if (resp.success == true) {
                        this.uploadedFiles[index].id = resp.data
                        this.uploadedFiles[index].tournament_id = this.dataService.newsDetails.id
                        this.uploadedFiles[index].name = file.name
                        this.uploadedFiles[index].size = 56

                        this.uploadedFiles[index].uploading = false
                        this.dataService.newsDetails.tournament_images.push({
                            id: resp.data,
                            tournament_id: this.dataService.newsDetails.id,
                            name: file.name,
                            size: file.size,
                        })
                        this.alert.success(`${file.name.split(".")[0]} uploaded successfully`)
                        console.log(this.dataService.newsDetails.tournament_images)
                    } else {
                        this.alert.error(resp.errors.general)
                        this.uploadedFiles[index].uploading = false
                    }
                })//upload api
            })
    }


    deleteImage(index: number) {
        let delId = this.uploadedFiles[index].id
        this.uploadedFiles.splice(index, 1)
        this.uploadedFiles.splice(index, 0, {
            deletion: true
        })
        // this.uploadedFiles[index].image = this.spinnerSVG
        const params = {
            id: delId
        }
        this.dataService.deleteImage(params).subscribe(resp => {
            this.uploadedFiles.splice(index, 1)
            this.dataService.newsDetails.tournament_images.splice(index, 1)
        })
    }

    fileDragStart(e: any): void {
        e.preventDefault()
        // e.target.classList.remove('img-box')
        e.target.classList.add('highlight')

    }

    fileDragEnd(e: any): void {
        e.preventDefault()
        e.target.classList.remove('highlight')
    }

    fileDropped(e: any): void {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer && e.dataTransfer.files.length) {
            this.uploadFiles(e.dataTransfer.files)
        }
        e.target.classList.remove('highlight')
    }

    fileDragStartNext(e: any): void {
        e.preventDefault()
        e.target.classList.add('highlight-inner')
    }

    fileDragEndNext(e: any): void {
        e.preventDefault()
        e.target.classList.remove('highlight-inner')
    }

    fileDroppedNext(e: any): void {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer && e.dataTransfer.files.length) {
            this.uploadFiles(e.dataTransfer.files)
        }
        e.target.classList.remove('highlight-inner')
    }

    browseFiles(event: any) {
        event.preventDefault()
        const element = document.getElementById('other-files')
        element.click()
    }
    cancel() {
        this.router.navigateByUrl('/agency/property/list')
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
        document.getElementById('thumbnail-image').setAttribute('src', this.thumbnail)
        this.cropperModalRef.hide()
        this.dataService.newsDetails.image = 'yes'
        this.image = 'yes'
        this.save()
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64
    }

    save() {

        let params: any

        fetch(this.thumbnail)

            .then(res => res.blob())
            .then(blob => {
                const imageFile = new Blob([blob])
                const formData = this.api.jsonToFormData(params)
                formData.append('tournament_thumbnail', imageFile)
                formData.append('id', this.dataService.newsDetails.id)
                formData.append('name', this.dataService.newsDetails.name)
                formData.append('tournament_type', this.dataService.newsDetails.tournament_type)
                formData.append('level', this.dataService.newsDetails.level)
                formData.append('age_category', this.dataService.newsDetails.age_category)
                formData.append('gender', this.dataService.newsDetails.gender)
                formData.append('location', this.dataService.newsDetails.location)
                formData.append('description', this.dataService.newsDetails.description)

                const saveUpdate = this.dataService.update(formData)
                saveUpdate.subscribe((resp: any) => {
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)

                        return false
                    } else {
                        this.alert.success('Main image uploaded')
                    }
                })
            })
    }

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
