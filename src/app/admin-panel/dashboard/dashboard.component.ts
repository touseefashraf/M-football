import { IAlertService } from './../../libs/ialert/ialerts.service';
import { ApiService } from './../../services/api.service'
import { Component, OnInit } from '@angular/core'
import { DataService } from './data.service'
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';


@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    mt = moment

    constructor(
        private api: ApiService,
        public ds: DataService,
        public cs: ConstantsService,
        public alert: IAlertService
    ) {

    }

    ngOnInit() {

    }

    logOut(): void {
        const check = this.api.logOut()
        if (check) {
            location.reload()
        }
    }
}
