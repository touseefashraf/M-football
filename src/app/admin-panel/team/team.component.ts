import { Router, ActivatedRoute } from '@angular/router'
import { DataService } from './data.service'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { Route } from '@angular/compiler/src/core'

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    dataStatus = 'fetching'
    thumbnail: any = '/assets/img/user.jpg'
    spinnerSVG = `/assets/images/spinner.svg`
    deletePop: any
    countries: any
    teamForm: FormGroup
    teamList = []
    selectedIndex: any
    selectedId: any
    modalRef: BsModalRef
    imageChangedEvent: any = ''
    croppedImage: any = ''
    cropperModalRef: BsModalRef
    page = 1
    pagination: any
    loaderOptions = {
        rows: 5,
        cols: 6,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        private data: DataService,
        private router: Router,
        private route: ActivatedRoute,
        public api: ApiService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {

        this.data.getCountries().subscribe((resp: any) => {
            this.countries = resp.data
            console.log(this.countries)

        })

        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.page = params.page
                this.getList()
            } else {
                this.getList()
            }
        })

        this.teamForm = this.fb.group({
            id: new FormControl(null),
            full_name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            short_name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            country_id: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.maxLength(1000)]),
        })
    }

    getList() {

        const filtersParam = {
            page: this.page
        }
        this.data.getTeam(this.page)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    return false
                } else {
                    this.teamList = resp.data.data
                    console.log(this.teamList)

                    this.pagination = resp.data
                    this.dataStatus = 'done'
                }
            })
    }

    setPagination(page: number) {
        let filtersParam: any = {}
        filtersParam = {
            page
        }
        this.router.navigate(['admin/team'], { queryParams: filtersParam, replaceUrl: true })
    }

    ngOnInit() {
        // this.data.getTeam().subscribe((resp: any) => {
        //     if (resp.success === true) {
        //         this.teamList = resp.data
        //         this.dataStatus = 'done'
        //     }
        // })
    }

    get g() {
        return this.teamForm.controls
    }

    openModalSubject(subjectModal, index) {
        if (index > -1) {
            this.selectedIndex = index
            this.thumbnail = this.api.teamImageUrl(this.teamList[index].id) + '?' + JSON.stringify(new Date())
            this.teamForm.controls.id.setValue(this.teamList[index].id)
            this.teamForm.patchValue(this.teamList[index])
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
        const index = this.teamList.findIndex(d => d.id === imgId)
        if (index > -1 && this.teamList[index].timeStamp) {
            return this.api.teamImageUrl(imgId) + '?' + this.teamList[index].timeStamp
        } else {
            return this.api.teamImageUrl(imgId)
        }
    }
    saveTeam(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')

            return false
        }
        const params = {
            id: this.teamForm.value.id,
            full_name: data.value.full_name,
            short_name: data.value.short_name,
            description: data.value.description,
            country_id: data.value.country_id,
        }

        fetch(this.thumbnail)
            .then(res => res.blob())
            .then(blob => {
                const imageFile = new Blob([blob])
                const formData = this.api.jsonToFormData(params)
                formData.append('team_image', imageFile)


                let saveUpdate = this.data.addTeam(formData)
                if (this.teamForm.value.id !== null) {
                    saveUpdate = this.data.updateTeam(formData)
                }
                saveUpdate.subscribe((resp: any) => {
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)
                        this.modalRef.hide()
                        f.resetForm()


                        return false
                    } else {
                        if (this.teamForm.value.id !== null) {
                            this.alert.success('Changes done successfully!!')
                            const index = this.countries.findIndex(d => d.id === +data.value.country_id)
                            const mergeParams = {
                                id: this.teamForm.value.id,
                                full_name: data.value.full_name,
                                short_name: data.value.short_name,
                                description: data.value.description,
                                timeStamp: JSON.stringify(new Date()),
                                country: this.countries[index]
                            }
                            this.teamList[this.selectedIndex] = mergeParams
                            this.teamForm.controls.id.setValue(null)
                        } else {
                            this.alert.success('Team added successfully!!')
                            const index = this.countries.findIndex(d => d.id === +data.value.country_id)
                            const mergeParams = {
                                id: resp.data,
                                full_name: data.value.full_name,
                                short_name: data.value.short_name,
                                description: data.value.description,
                                country_id: data.value.country_id,
                                country: this.countries[index]
                            }
                            this.teamList.unshift(mergeParams)
                        }
                    }
                    this.modalRef.hide()
                    f.resetForm()
                })
            })
    }

    deleteTeam() {
        const params = {
            id: this.selectedId
        }
        this.data.deleteTeam(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.deletePop.hide()

                    return false
                } else {
                    const deletingIndex = this.teamList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.teamList.splice(deletingIndex, 1)
                    this.deletePop.hide()
                    this.alert.success('Team deleted successfully!!')
                }
            })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelTeamButton(f: any) {
        f.resetForm()
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
