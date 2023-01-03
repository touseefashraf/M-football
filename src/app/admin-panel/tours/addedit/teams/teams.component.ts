import { DataService } from '../data.service'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
    dataStatus = 'fetching'
    thumbnail: any = '/assets/img/user.jpg'
    spinnerSVG = `/assets/images/spinner.svg`
    deletePop: any
    teamForm: FormGroup
    teamList = []
    selectedIndex: any
    selectedId: any
    modalRef: BsModalRef
    imageChangedEvent: any = ''
    croppedImage: any = ''
    cropperModalRef: BsModalRef
    teamIds = []
    tIds = []
    teamListCount = 1
    loaderOptions = {
        rows: 5,
        cols: 5,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        private dataService: DataService,
        public api: ApiService,
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {

    }

    ngOnInit() {
        //hide selected teams
        if (this.dataService.newsDetails.tournament_teams.length > 0) {
            this.dataService.newsDetails.tournament_teams.forEach((element: any) => {
                this.teamIds.push(element.team_id)
            })
        }

        this.dataService.teams().subscribe((resp: any) => {
            if (resp.success === true) {
                this.teamList = resp.data
                if (this.teamIds.length == this.teamList.length) {
                    this.teamListCount = 0
                }
                this.dataStatus = 'done'
            }
        })
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

    save() {
        if (this.tIds.length == 0) {
            this.alert.error('Please select team.')

            return false
        }


        const postData = {
            tournament_id: this.dataService.newsDetails.id,
            teamIds: this.tIds
        }
        this.dataService.addTeam(postData).subscribe((resp: any) => {
            if (resp.success == true) {
                const params = {
                    id: this.dataService.newsDetails.id
                }
                this.dataService.getDetails(params).subscribe((resp: any) => {
                    if (resp.success == true) {
                        this.teamIds = []
                        this.tIds = [] // empty selected teams
                        this.teamList = [] //empty teams main list 
                        this.dataService.newsDetails.tournament_teams = resp.data.tournament_teams
                        //hide selected teams
                        this.dataService.newsDetails.tournament_teams.forEach((element: any) => {
                            this.teamIds.push(element.team_id)
                        })
                        this.dataService.teams().subscribe((resp: any) => { // get team list
                            if (resp.success === true) {
                                this.teamList = resp.data
                                if (this.teamIds.length == this.teamList.length) {
                                    this.teamListCount = 0
                                }
                                this.dataStatus = 'done'
                            }
                        })

                        this.alert.success('Team added successfully.')
                        this.modalRef.hide()
                    }
                })


            } else {
                this.alert.error(resp.errors.general)
                this.modalRef.hide()
            }
        })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelTeamButton() {
        this.modalRef.hide()
    }
    setTeam(id, e) {
        let index
        if ((index = this.tIds.indexOf(id)) > -1) {
            this.tIds.splice(index, 1) // to remove array item
        } else {
            this.tIds.push(id)
        }
    }

    setClass(id) {
        if (this.tIds.indexOf(id) > -1) {
            return 'count-container active clickable'
        } else {
            return 'count-container inactive clickable'
        }
    }

    deleteTeam() {
        const params = {
            id: this.selectedId
        }

        this.dataService.deleteTeam(params)
            .subscribe((resp: any) => {
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.deletePop.hide()

                    return false
                } else {

                    const deletingIndex = this.dataService.newsDetails.tournament_teams.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })

                    const teamIndex = this.teamIds.findIndex((d: any) => {
                        return d.id === this.dataService.newsDetails.tournament_teams[deletingIndex].team_id
                    })

                    if (teamIndex == - 1) {
                        this.teamIds.splice(teamIndex, 1)
                    }

                    this.dataService.newsDetails.tournament_teams.splice(deletingIndex, 1)

                    this.deletePop.hide()
                    this.teamListCount = 1
                    this.alert.success('Team deleted successfully!!')

                }
            })
    }
}
