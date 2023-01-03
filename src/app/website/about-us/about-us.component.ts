import { DataService } from './data.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
    contactForm: FormGroup
    dataStatus: any = 'fetching'
    content: any = ''
    constructor(
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        public data: DataService
    ) {
        this.contactForm = this.fb.group({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            email: new FormControl(null, [Validators.required, Validators.maxLength(255), Validators.email]),
            contact_no: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
            message: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
        })
    }

    ngOnInit() {
        this.data.get('about-us').subscribe((resp: any) => {
            if (resp.success == true) {
                this.content = resp.data.content
                this.dataStatus = 'done'
            } else {
                this.dataStatus = 'done'
               // this.dataToSend.content = 'this si the asdf'
            }
        })
    }

    get g() {
        return this.contactForm.controls
    }

    sendInquiry(data: any, f: any) {
        if (data.status === 'INVALID') {
            this.alert.error('Please Fill valid data in all fields and try again.')

            return false
        }
        this.data.sendInquiry(data.value).subscribe((resp: any) => {
            if (resp.success === true) {
                this.alert.success('Your inquiry send successfully')
                f.resetForm()
            } else {
                this.alert.error(resp.errors.general)
            }
        })
    }
}
