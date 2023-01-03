import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { ApiService } from 'src/app/services/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { DataService } from './data.service';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
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
        cols: 6,
        colSpans: {
            0: 1,
        }
    }
    type: any = ''
    searchKey: any = ''
    tournamentId:any='';
    requestDetailList: any;
    detailStatus='fetching';
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
            if (params.tournament_id) {
                this.tournamentId = params.tournament_id
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
        this.tournamentId=''
        this.getList()
    }
    getList() {
        const params = {
            page: this.page,
            type: this.searchKey,
            tournament_id:this.tournamentId
        }
        this.dataService.list(params).subscribe((resp: any) => {
            if (resp.success === true) {
                this.list = resp.data.data
                this.pagination = resp.data
                this.fetching = false
                this.router.navigate(['/admin/requests'], { queryParams: params, replaceUrl: true })
            }
        })
    }
    setPagination(page: number) {
        let filtersParam: any = {}

        filtersParam = {
            type: this.type,
            tournament_id:this.tournamentId,
            page,
        }
        this.router.navigate(['/admin/requests'], { queryParams: filtersParam, replaceUrl: true })
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
    requestdetailModal(template: TemplateRef<any>, id: any) {
        this.selectedId = id
        this.modalRef = this.modalService.show(
            template,
            {
                class: 'modal-lg modal-dialog admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    getRequestdetail(id: any) {
        this.dataService.requestDetailList(id).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.requestDetailList = resp.data
                this.detailStatus='done'
            }
        })
    }

    updateStatus(rowId: number, readStatus: string) {
        const params = {
            id: rowId,
            status: readStatus
        }
        this.dataService.statusUpdate(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()

                    return false
                } else {
                    const Index = this.list.findIndex(d => d.id === rowId)
                    console.log(Index)
                    this.list[Index].status = readStatus
                    this.alert.success('status updated successfully!!')
                }
            })
      }

    // edit(id: number) {
    //     this.router.navigateByUrl(`/${this.api.user.user_type}/tournaments/publish?id=${id}`)
    // }

    // add() {
    //     this.router.navigateByUrl(`/${this.api.user.user_type}/tournaments/publish?id=-1`)
    // }

    // delete() {
    //     const params = {
    //         id: this.selectedId
    //     }
    //     this.dataService.delete(params)
    //         .subscribe((resp: any) => {
    //             if (resp.success === false) {
    //                 this.alert.error(resp.errors.general)

    //                 return false
    //             } else {
    //                 this.list.splice(this.deletingIndex, 1)
    //                 this.alert.success('Deleted succesfully')
    //             }
    //         })
    // }



}
