import { UIHelpers } from './../../helpers/ui-helpers'
import { Router, ActivatedRoute } from '@angular/router'
import { Component, OnInit, Input } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { apis } from '../../../environments/environment'
import { DataService } from './data.service'

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
    contactForm: FormGroup
    formShow = true


    constructor(
        private fb: FormBuilder,
        public ui: UIHelpers,
        private alert: IAlertService,
        public data: DataService,
        private router: Router
    ) {
        this.router.navigate(['/about-us'])
        return
        this.contactForm = this.fb.group({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            email: new FormControl(null, [Validators.required, Validators.maxLength(255), Validators.email]),
            contact_no: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
            message: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
        })
    }

    ngOnInit() {
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
                this.formShow = false

                f.resetForm()
            } else {
                this.alert.error(resp.errors.general)
            }
        })
    }

}
