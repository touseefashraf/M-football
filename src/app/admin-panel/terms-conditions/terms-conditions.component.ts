import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
@Component({
    selector: 'app-terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.css']
  })
  export class TermsConditionsComponent implements OnInit {
    dataToSend: any = {
        id: '',
        // route: 'e-subbidding',
        content: ''
    }
    dataStatus = 'fetching'
    constructor(
        private dataService: DataService,
        public ui: UIHelpers,
        private alert: IAlertService,
    ) { }

    ngOnInit() {
        
        this.dataService.get('term-conditions').subscribe((resp: any) => {
            if (resp.success == true) {
                this.dataToSend.content = resp.data.content
                this.dataStatus = 'done'
            } else {
                this.dataStatus = 'done'
                //this.dataToSend.content = 'this si the asdf'
            }
        })

    }
    save() {

        const params = {
            content: this.dataToSend.content,
            route: 'term-conditions'
        }
        
        let saveUpdate = this.dataService.edit(params)
        saveUpdate.subscribe((resp: any) => {
            if (resp.success === false) {
                this.alert.error(resp.errors.general)

                return false
            } else {
                this.alert.success('Changes done successfully!!')
            }
        })

    }
}
