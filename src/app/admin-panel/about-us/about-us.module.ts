import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { QuillModule } from 'ngx-quill'
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { DataService } from './data.service'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminSharedModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    QuillModule.forRoot(),
    RouterModule.forChild([
        { path: '', component: AboutUsComponent }
    ])
  ],
  providers: [DataService],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
