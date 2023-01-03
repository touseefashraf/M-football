import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    s2=true
    s3 = false
    s4 = false

    constructor() { }

    ngOnInit() {
    }
    step3(){
        this.s2=false
        this.s3=true
        this.s4=false
    }
    step4(){
        this.s2=false
        this.s3=false
        this.s4=true
    }
}
