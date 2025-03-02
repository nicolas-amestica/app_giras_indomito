import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  constructor(
    private http: HttpClient
  ) { }

  downloadPdf(fullPath: string): Observable<Blob> {
    const pdfUrl = fullPath;
    return this.http.get(pdfUrl, { responseType: 'blob' });
  }

}
