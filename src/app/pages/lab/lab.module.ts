import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LabComponent } from './lab.component';
import { LabRoutingModule } from './lab-routing.module';

@NgModule({
  imports: [CommonModule, LabRoutingModule, LabComponent],
})
export class LabModule {}
