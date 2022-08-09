import { Contact, Imagem } from './../contact';

import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  public apiUrl = 'http://localhost:8080/contacts';

  listContacts: Contact[] = [];
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  constructor(private httpClient: HttpClient) {}

  public getContacts() {
    return this.httpClient.get<Contact[]>(this.apiUrl);
  }

  public postContact(form: any) {
    // console.log(form);

    return this.httpClient.post<any>(this.apiUrl, form, this.httpOptions);
  }

  public deleteContact(id: any) {
    const urlContact: string = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(urlContact, this.httpOptions);
  }

  public putContact(id: any, form: any) {
    return this.httpClient.put<any>(
      `${this.apiUrl}/${id}`,
      form,
      this.httpOptions
    );
  }

  public loadById(id: any) {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
}
