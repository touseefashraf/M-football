import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { ApiService } from '../../services/api.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UIHelpers } from 'src/app/helpers/ui-helpers';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    constructor(
        private api: ApiService,
        private router: Router,
        private fb: FormBuilder,
        public ui: UIHelpers,
        public alert: IAlertService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.email]),
            password: new FormControl(null, [Validators.required]),
        })
    }

    get g() {
        return this.loginForm.controls
    }

    login(data: any): boolean {
        if (data.status === 'INVALID') {
            this.alert.error('Please enter data in all fields and try again.')

            return false
        }
        data.device_name = 'web'
        this.api.login(data.value).subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.alert.success('Login successfull')
            }

            this.api.doUserRedirects(resp, this.router)
        })
    }
}
