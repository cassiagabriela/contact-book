import { FormEditComponent } from './form-edit/form-edit.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { TemplateBindingParseResult } from '@angular/compiler';
import { FormComponent } from './form/form.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgModule, TemplateRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ContactsComponent},
  {path: 'new', component: FormComponent},
 // {path: 'del', component: ConfirmDeleteComponent},
  //{path: 'edit', component: FormEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
