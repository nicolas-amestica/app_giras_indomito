import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Login } from '../interfaces/login.interface';
import { Router } from '@angular/router';

const BASE_API_URL = environment.apiBaseUrl

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  login(loginForm: Login) {
    const url = `${BASE_API_URL}/v1/autenticar/login`;

    return this.httpClient.post<any>(url, loginForm).pipe(
      tap((auth) => {
        const {nombre, apellido_paterno, apellido_materno, token} = auth.result
        localStorage.setItem('user', JSON.stringify({
          nombre,
          apellido_paterno,
          apellido_materno,
          token
        }));
        this.router.navigate(['/home']);
      }),
      catchError(error => {
        return of(error.error.error);
      })
    );
  }
}
