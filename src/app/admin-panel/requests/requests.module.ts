import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { AdminSharedModule } from './../admin-shared/admin-shared.module';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    SharedModule,
    ReactiveFormsModule,
    ModalModule.forChild(),
    RouterModule.forChild([
        {
            path:'',
            component:RequestsComponent
        }
    ])
  ],
  declarations: [RequestsComponent],
  providers:[DataService]
})
export class RequestsModule { }
