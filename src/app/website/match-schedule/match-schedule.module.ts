import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchScheduleComponent } from './match-schedule.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: MatchScheduleComponent }
        ])
    ],
    declarations: [MatchScheduleComponent]
})
export class MatchScheduleModule { }
