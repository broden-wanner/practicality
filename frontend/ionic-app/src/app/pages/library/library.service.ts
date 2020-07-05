import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  /**
   * Uploads the file and any metadata to the server
   * @param formData the form data to upload to the library
   */
  public upload(form: any): Observable<any> {
    return this.http.post(`${environment.api}/library-uploads/`, form);
  }
}
