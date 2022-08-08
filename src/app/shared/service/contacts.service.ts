import { Imagem } from './../contact';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public apiUrl= 'http://localhost:8080/contacts';

  listContacts: Contact[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    })
  }
   constructor(private httpClient: HttpClient) {   }

  public getContacts() {
    return this.httpClient.get<Contact[]>(this.apiUrl);
  }

  public postContact(contact: any){

    let form = new FormData();
    form.append('nome',contact.nome)
    form.append('email',contact.email)
    form.append('telefone',contact.telefone)
    form.append('data_nascimento',contact.data_nascimento)
    form.append('imagem',contact.imagem)


    return this.httpClient.post<any>(this.apiUrl, form, this.httpOptions);
  }

  public deleteContact(id: any){
    const urlContact: string=`${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(urlContact, this.httpOptions);
  }

  public putContact(contact: any ){
    return this.httpClient.put<any>(`${this.apiUrl}/${contact.id}`, contact, this.httpOptions);
  }

  public loadById(id: any) {
    return this.httpClient.get(`${this.apiUrl}/${id}`)
  }

}
