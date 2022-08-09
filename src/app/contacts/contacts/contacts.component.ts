import { FormEditComponent } from './../form-edit/form-edit.component';
import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';
import { FormComponent } from './../form/form.component';
import { Observable } from 'rxjs';
import { Contact } from './../../shared/contact';
import { ContactsService } from './../../shared/service/contacts.service';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateBindingParseResult } from '@angular/compiler';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactSelecionado: any;
  listContacts: Contact[] = [];

  constructor( private contactsService: ContactsService,
    @Optional() public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {

    this.contactsService.getContacts().subscribe(listContacts => {

      listContacts.forEach((element)=>{
        const [ano, mes, dia] = element.data_nascimento.split('-');
        element.data_nascimento = `${dia}/${mes}/${ano}`;
      });

      this.listContacts = listContacts;
      console.log(this.listContacts);
      });

  }

  ngOnInit(): void {}

  openForm(): void {
    const  dialogRef = this.dialog.open(FormComponent, {
      width: '500px',
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  editContact(contact: Contact) {

    const [dia, mes, ano] = contact.data_nascimento.split('/');
        contact.data_nascimento = `${ano}-${mes}-${dia}`;


    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '500px',
      data: {
        id: contact.id,
        nome: contact.nome,
        email: contact.email, 
        telefone: contact.telefone,
        data_nascimento: contact.data_nascimento,
        imagem: contact.imagemContato
      },
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('The dialog was closed');
    //   //this.animal = result;
    // });
    // this.router.navigate([id], {relativeTo: this.route});

    // .afterClosed().subscribe(() => {
    //   this.router.navigate([id], {relativeTo: this.route});
    // });
  }


  deleteContact(id: any){
    const  dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: {
        id: id
      }
    });
    //return this.contactSelecionado = id;
  }
}
