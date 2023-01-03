import { QuillModule } from 'ngx-quill';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { SharedModule } from './../../website/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions.component';
import { DataService } from './data.service'
import { PopoverModule } from 'ngx-bootstrap/popover';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminSharedModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    QuillModule.forRoot(),

    RouterModule.forChild([
        { path: '', component: TermsConditionsComponent }
    ])
  ],
  providers: [DataService],
  declarations: [TermsConditionsComponent]
})
export class TermsConditionsModule { }
