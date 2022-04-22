import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyItemComponent } from './specialty-item/specialty-item.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpecialtyGroupComponent } from './specialty-group/specialty-group.component';
import { SpecialtiesComponent } from './specialties.component';

@NgModule({
  declarations: [
    SpecialtyItemComponent,
    SpecialtyGroupComponent,
    SpecialtiesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SpecialtiesModule { }
