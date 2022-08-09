import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from './../../shared/service/contacts.service';


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
    public dialogRef: MatDialogRef<FormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      id: [data.id],
      nome: [data.nome, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      telefone: [data.telefone, Validators.required],
      data_nascimento: [data.data_nascimento, Validators.required],
      imagem: [data.imagemContato, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  selectFile(event: any)  {
    const file = event.target.files[0];
    this.contactForm.get('imagem')?.setValue(file);
    console.log(file)
  }

  editContact(): void {
    let form = new FormData();
    
    form.append('nome', this.contactForm.get(['nome'])?.value)
    form.append('email',this.contactForm.get(['email'])?.value)
    form.append('telefone',this.contactForm.get(['telefone'])?.value)
    form.append('data_nascimento',this.contactForm.get(['data_nascimento'])?.value)
    form.append('imagem', this.contactForm.get(['imagem'])?.value)


    this.rest.putContact(this.contactForm.value.id, form).subscribe(
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

