import { Injectable } from '@angular/core';
import {Contact} from "../interfaces/contact.interface";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "../../../environments/environment";

const BASE_API_URL = environment.apiBaseUrl

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sendEmail(contact: Contact) {
    const url = `${BASE_API_URL}/send-email`;

    return this.httpClient.post(url, contact).pipe(
      tap((email) => {
        return email;
      }),
      catchError(error => {
        return of(error.error.error);
      })
    );
  }
}
