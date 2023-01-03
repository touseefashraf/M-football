import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: TripsComponent }
    ])
  ],
  declarations: [TripsComponent]
})
export class TripsModule { }
