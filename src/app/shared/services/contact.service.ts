import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly endpoint = 'https://27ibp4lfji6cw2viemutvvzxmm0hheqq.lambda-url.eu-south-1.on.aws/';

  constructor(private readonly http: HttpClient) {}

  sendMessage(payload: ContactPayload): Observable<unknown> {
    return this.http.post(this.endpoint, payload);
  }
}