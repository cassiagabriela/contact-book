import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from 'src/app/shared/contact';
import { ContactsService } from 'src/app/shared/service/contacts.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  contactSelecionadoId: any;
  constructor(
    private snackBar: MatSnackBar,
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
     ) { }

  ngOnInit(): void {
  }

  confirm(id: any) {
    this.contactsService.deleteContact(id).subscribe();
    this.snackBar.open('Contato apagado com sucesso', 'X', {
      panelClass: ['snack-style-sucesso'],
    }

    );
    window.location.reload();
    this.dialogRef.close();

  }
  cancel(): void {
    this.dialogRef.close();
  }

}
