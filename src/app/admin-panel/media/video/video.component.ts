import { ConstantsService } from '../../../services/constants.service';
import { ApiService } from '../../../services/api.service';
import { IAlertService } from '../../../libs/ialert/ialerts.service';
import { Component, OnInit } from '@angular/core'
import { DataService } from './data.service'
import * as moment from 'moment'

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    mt = moment
    mainImage: any
    uploading = false
    constructor(
        public api: ApiService,
        public ds: DataService,
        public cs: ConstantsService,
        public alert: IAlertService
    ) {

    }

    ngOnInit() {
        this.mainImage = this.api.homeVideoUrl()
    }

    

    browseFiles(event: any) {
        event.preventDefault()
        const element = document.getElementById('other-files')
        element.click()
    }

    onDocumentChange(event: any) {
        this.uploadFiles(event.target.files)
    }

    uploadFiles(files: FileList) {
        const allowedExtensions = ['mp4', 'MP4']
        const defaulterFiles = []

        Array.from(files).forEach((file: any) => {
            const extension = file.name.split('.').pop().toLowerCase()
            
            if (allowedExtensions.indexOf(extension) > -1) {
                    this.readFile(file)
            } else {
                defaulterFiles.push(file.name)
                this.alert.error(`${file.name} has an invalid file type. mp4 is allowed`)
            }
        })
    }

    readFile(file: any) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e: any) => {

            
            this.uploadDocument(reader.result, file)
        }
    }

    uploadDocument(fileData: any, file: any) {
        this.uploading = true
        fetch(fileData)
            .then(res => res.blob())
            .then(blob => {
                const myFile = new Blob([blob]) // for microsoft edge support
                const formData = new FormData()
                formData.append('image', myFile)
                this.ds.uploadFile(formData).subscribe((resp: any) => {
                    if (resp.success == true) {
                        
                        this.alert.success(`${file.name.split(".")[0]} uploaded successfully`)
                        window.location.reload()
                        this.uploading = false
                    } else {
                        this.alert.error(resp.errors.general)
                        this.uploading = false
                    }
                })//upload api
            })
    }
}
