import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path:'',
        component:ImageUploaderComponent}
    ])
  ],
  declarations: [ImageUploaderComponent]
})
export class ImageUploaderModule { }
