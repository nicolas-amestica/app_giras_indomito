import type { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// biome-ignore lint/style/useImportType: <explanation>
import { HttpClient } from '@angular/common/http';

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
