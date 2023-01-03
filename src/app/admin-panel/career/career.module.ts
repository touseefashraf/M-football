import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: CareerComponent }
    ])
  ],
  declarations: [CareerComponent]
})
export class CareerModule { }
