import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from './data.service';

@Component({
    selector: 'app-faqs',
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
    dataStatus = 'fetching'
    deletePop: any
    countries: any
    faqForm: FormGroup
    faqList = []
    selectedIndex: any
    selectedId: any
    modalRef: BsModalRef
    loaderOptions = {
        rows: 5,
        cols: 3,
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
        this.faqForm = this.fb.group({
            id: new FormControl(null),
            question: new FormControl(null, [Validators.required]),
            answer: new FormControl(null, [Validators.required])
        })
    }

    ngOnInit() {
        this.data.getFaq().subscribe(
            (resp: any) => {
                if (resp.success === true) {
                    this.faqList = resp.data
                    this.dataStatus = 'done'
                }
            }
        )
    }

    get g() {
        return this.faqForm.controls
    }

    openModalSubject(subjectModal, index) {
        if (index > -1) {
            this.selectedIndex = index
            this.faqForm.controls.id.setValue(this.faqList[index].id)
            this.faqForm.patchValue(this.faqList[index])
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

    saveFAQ(data: any, f: any) {
        // this.faqForm.value
        if (data.status === 'INVALID') {
            this.alert.error('Please Fill valid data in all fields and try again.')

            return false
        }
        let saveMethod = this.data.addFaq(data.value)

        if (this.faqForm.value.id !== null) {
            saveMethod = this.data.updateFaq(data.value)
        }

        saveMethod.subscribe((resp: any) => {
            if (resp.success === true) {
                if (this.faqForm.value.id !== null) {
                    this.alert.success('Your FAQ Updated successfully')
                    this.faqList[this.selectedIndex] = data.value
                } else {
                    data.value.id = resp.data
                    this.alert.success('Your FAQ saved successfully')
                    this.faqList.push(data.value)
                }
            } else {
                this.alert.error(resp.errors.general)
            }

            this.modalRef.hide()
            f.resetForm()
        })
    }

    deleteFAQ() {
        const params = {
            id: this.faqList[this.selectedIndex].id
        }
        this.data.deleteFaq(params).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.deletePop.hide()

                return false
            }

            this.faqList.splice(this.selectedIndex, 1)
            this.alert.success('FAQ deleted successfully!!')
            this.deletePop.hide()
        })
    }

    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelFAQ(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }

}
