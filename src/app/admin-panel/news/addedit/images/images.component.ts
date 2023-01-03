import { DataService } from '../data.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit, Input, OnDestroy, TemplateRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../../../services/api.service'
import { IAlertService } from '../../../../libs/ialert/ialerts.service';
import { ConstantsService } from 'src/app/services/constants.service'

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    dataToSend: any = {
        id: '',
        // route: 'e-subbidding',
        content: ''
    }
    editorConfig: any = ConstantsService.EDITOR_CONFIG
    waiting = {
        save: false
    }
    selectedId: any
    constructor(
        public ds: DataService,
        private alert: IAlertService,
        private route: ActivatedRoute,

    ) {

     }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (params.id) {
                this.dataToSend.id = params.id
            }
            console.log(this.dataToSend)
        })
        if (this.dataToSend.id>0) {
            this.selectedId=this.dataToSend.id
            console.log(this.selectedId)
            this.ds.getDetails(this.selectedId).subscribe((resp: any) => {
                if (resp.success === true) {
                    if (resp.data !== null) {
                        this.dataToSend.id = resp.data.id
                        this.dataToSend.content = resp.data.content
                    }
                }
            })
        }
    }

    save() {
        this.waiting.save = true
        if (this.dataToSend.content === '') {
            this.alert.error('Content cant be empty')
            this.waiting.save = false

            return false
        }
        this.ds.update(this.dataToSend).subscribe((resp: any) => {
            this.waiting.save = false
            if (resp.success === true) {
                if (this.dataToSend.id !== '') {
                    this.alert.success('Content Updated Successfully')
                } else {
                    this.alert.success('content saved successfully')
                    this.dataToSend.id = resp.data.id
                }
            } else {
                this.alert.error(resp.errors.general)
            }
        })
    }
}
