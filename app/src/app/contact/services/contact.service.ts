import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, filter, Observable, of, tap } from "rxjs";
import { Contact } from "../interfaces/contact.interface";
import { environment } from "../../../environments/environment";

const BASE_API_URL = environment.apiBaseUrl

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sendEmail(contactForm: Contact) {
    const url = `${BASE_API_URL}/v1/contact/send-email`;

    return this.httpClient.post<any>(url, contactForm).pipe(
      tap(({message}) => message),
      catchError(error => {
        return of(error);
      })
    );
  }
}


// getHousing(): Observable<Housing[]> {
//   return this.http.get<HousingResponses>(`${BASE_API_URL}/viviendas?limit=10000&page=1`).pipe(
//     map(({result}) => result.data)
//   );
// }
