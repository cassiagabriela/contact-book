import { ContactsService } from './../../shared/service/contacts.service';
import { Contact } from './../../shared/contact';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {

  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private rest: ContactsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {
    this.contactForm = this.fb.group({
      id: [data.id],
      nome: [data.nome, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      telefone: [data.telefone, Validators.required],
      data_nascimento: [data.data_nascimento, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  editContact(): void {
    this.rest.putContact(this.contactForm.value).subscribe(
      (result) => {
        this.snackBar.open('Contato editado com sucesso', 'X', {
          panelClass: ['snack-style-sucesso'],
        });
        window.location.reload();
      }
    );
    this.dialogRef.close();
  }
  cancel(): void {
    this.dialogRef.close();
    this.contactForm.reset();
  }

}

