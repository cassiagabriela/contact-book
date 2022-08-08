import { ActivatedRoute } from '@angular/router';
import { ContactsService } from './../../shared/service/contacts.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Contact } from 'src/app/shared/contact';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rest: ContactsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      data_nascimento: [null, Validators.required],
      imagem: [null, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  createContact() {
    this.rest.postContact(this.contactForm.value).subscribe(
      (result) => {
        this.snackBar.open('Contato salvo com sucesso', 'X', {
          panelClass: ['snack-style-sucesso'],
        });

        //TODO: Adicionar result na listContacts na posição certa
        window.location.reload();
      },
      (error)=>{
          console.log(error)
      }
    );
    this.dialogRef.close();
    this.contactForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.contactForm.reset();
  }

}
// function controlsConfig(controlsConfig: any): FormGroup<any> {
//   throw new Error('Function not implemented.');
// }
