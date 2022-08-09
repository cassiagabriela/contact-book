import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from './../../shared/service/contacts.service';

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

  selectFile(event: any)  {
    const file = event.target.files[0];
    this.contactForm.get('imagem')?.setValue(file);
    console.log(file);
  }

  createContact() {
    let form = new FormData();

    form.append('nome', this.contactForm.get(['nome'])?.value)
    form.append('email',this.contactForm.get(['email'])?.value)
    form.append('telefone',this.contactForm.get(['telefone'])?.value)
    form.append('data_nascimento',this.contactForm.get(['data_nascimento'])?.value)
    form.append('imagem', this.contactForm.get(['imagem'])?.value)

    this.rest.postContact(form).subscribe(
      (result) => {
        this.snackBar.open('Contato salvo com sucesso', 'X', {
          panelClass: ['snack-style-sucesso'],
        });

        //TODO: Adicionar result na listContacts na posição certa
        // window.location.reload();
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
