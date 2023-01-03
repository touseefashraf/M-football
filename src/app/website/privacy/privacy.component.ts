import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(public data: DataService) { }
  dataStatus: any = 'fetching'
  content: any = ''
  ngOnInit() {
    this.data.get('privacy-policy').subscribe((resp: any) => {
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
