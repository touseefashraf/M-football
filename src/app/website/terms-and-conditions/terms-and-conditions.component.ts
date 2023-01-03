import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(public data: DataService) { }
  dataStatus: any = 'fetching'
  content: any = ''
  ngOnInit() {
    this.data.get('term-conditions').subscribe((resp: any) => {
        if (resp.success == true) {
            this.content = resp.data.content
            this.dataStatus = 'done'
        } else {
            this.dataStatus = 'done'
           // this.dataToSend.content = 'this si the asdf'
        }
    })
  }

}

