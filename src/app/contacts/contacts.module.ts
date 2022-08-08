import { NgxMaskModule } from 'ngx-mask';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { FormComponent } from './form/form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { FormEditComponent } from './form-edit/form-edit.component';

@NgModule({
  declarations: [
    ContactsComponent,
    FormComponent,
    ConfirmDeleteComponent,
    FormEditComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ]
})
export class ContactsModule { }
