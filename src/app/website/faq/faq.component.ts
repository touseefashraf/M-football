import { DataService } from './data.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
    faqList: any = []
    dataStatus = 'fetching'

    constructor(
        public data: DataService
    ) {
        this.data.getFaq().subscribe((resp: any) => {
            if (resp.success === true) {
                this.faqList = resp.data
                this.dataStatus = 'done'
            }
        })
    }

    ngOnInit() {
    }

}
