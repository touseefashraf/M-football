import { ApiService } from '../../../services/api.service'
import { IAlertService } from '../../../libs/ialert/ialerts.service'
import { ConstantsService } from '../../../services/constants.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { DataService } from './data.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment'
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class List implements OnInit {
    modalRef: BsModalRef
    deletingIndex = -1
    moment = moment
    selectedId = -1
    selectedIndex = -1
    selectedStatus = ''
    deletePop: any
    page = 1
    pagination: any
    fetching = true
    newsList: any = []
    spinnerSVG = `/assets/images/spinner.svg`
    dateFormat: any
    loaderOptions = {
        rows: 5,
        cols: 6,
        colSpans: {
            0: 1,
        }
    }    
    constructor(
        private modalService: BsModalService,
        private api: ApiService,
        public dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        public alert: IAlertService,
        public cs: ConstantsService
    ) {
        this.dateFormat = this.cs.DATE_TIME_FORMAT.SHORT_DATE
        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.page = params.page
                this.getList()
            } else {
                this.getList()
            }
        })

    }

    getList() {

        const filtersParam = {
            page: this.page
        }
        this.dataService.list(this.page)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    return false
                } else {
                    this.newsList = resp.data.data
                    this.pagination = resp.data
                    this.fetching = false
                }
            })
    }

    openSampleConfirmingModal(sampleProjectTemplate: TemplateRef<any>, id: number, index: number) {
        this.selectedId = id
        this.selectedIndex = index
        this.modalRef = this.modalService.show(
            sampleProjectTemplate,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    statusConfirmingModal(changeStatus: TemplateRef<any>, id: number, index: number, status: string) {
        this.selectedId = id
        this.selectedIndex = index
        this.selectedStatus = status
        this.modalRef = this.modalService.show(
            changeStatus,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    setPagination(page: number) {
        let filtersParam: any = {}
        filtersParam = {
            page
        }
        this.router.navigate(['/' + this.api.user.user_type + '/news/list'], { queryParams: filtersParam, replaceUrl: true })
    }

    ngOnInit(): void {
    }

    edit(id: number) {
        this.router.navigateByUrl(`/${this.api.user.user_type}/news/publish?id=${id}`)
    }

    add() {
        this.router.navigateByUrl(`/${this.api.user.user_type}/news/publish?id=-1`)
    }

    delete() {
        const params = {
            id: this.selectedId
        }
        this.dataService.delete(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)

                    return false
                } else {
                    this.newsList.splice(this.deletingIndex, 1)
                    this.alert.success('Deleted succesfully')
                }
            })
    }


    changeNewsStatus() {
        const params = {
            id: this.selectedId,
            status: this.selectedStatus
        }
        this.dataService.changeStatus(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)

                    return false
                } else {
                    this.newsList[this.selectedIndex].status = this.selectedStatus
                    this.alert.success(`Status changed to ${this.selectedStatus}`)
                    this.modalRef.hide()
                }
            })
    }
}
