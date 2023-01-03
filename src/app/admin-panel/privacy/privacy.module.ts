import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { SharedModule } from './../../website/shared/shared.module';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminSharedModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    QuillModule.forRoot(),
    RouterModule.forChild([
        { path: '', component: PrivacyComponent }
    ])
  ],
  providers: [DataService],
  declarations: [PrivacyComponent]
})
export class PrivacyModule { }
