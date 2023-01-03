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
    list: any = []
    spinnerSVG = `/assets/images/spinner.svg`
    dateFormat: any
    loaderOptions = {
        rows: 5,
        cols: 5,
        colSpans: {
            0: 1,
        }
    }
    type: any = ''
    searchKey: any = ''
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
            }
            if (params.type) {
                this.type = params.type
            }
            if (params) {
                this.getList()
            }
        })
    }

    // getList() {
    //     const filtersParam = {
    //         page: this.page
    //     }
    //     this.dataService.list(this.page).subscribe((resp: any) => {
    //         if (resp.success === false) {
    //             return false
    //         } else {
    //             this.list = resp.data.data
    //             this.pagination = resp.data
    //             this.fetching = false
    //         }
    //     })
    // }


    search() {
        this.searchKey = this.type
        this.getList()
    }
    reset() {
        this.searchKey = ''
        this.type = ''
        this.getList()
    }
    getList() {
        const params = {
            page: this.page,
            tournament_type: 'tournament'
        }
        this.dataService.list(params).subscribe((resp: any) => {
            if (resp.success === true) {
                this.list = resp.data.data
                this.pagination = resp.data
                this.fetching = false
                this.router.navigate(['/admin/tournaments/list'], { queryParams: params, replaceUrl: true })
            }
        })
    }
    setPagination(page: number) {
        let filtersParam: any = {}

        filtersParam = {
            tournament_type: this.type,
            page,
        }
        this.router.navigate(['/admin/tournaments/list'], { queryParams: filtersParam, replaceUrl: true })
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

    ngOnInit(): void {
    }

    view(id: number, type: any, page: number = 1) {
        this.router.navigateByUrl(`/${this.api.user.user_type}/requests?page=${page}&type=${type}&tournament_id=${id}`)
    }

    edit(id: number) {
        this.router.navigateByUrl(`/${this.api.user.user_type}/tournaments/publish?id=${id}`)
    }


    add() {
        this.router.navigateByUrl(`/${this.api.user.user_type}/tournaments/publish?id=-1`)
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
                    this.list.splice(this.deletingIndex, 1)
                    this.alert.success('Deleted succesfully')
                }
            })
    }

}
