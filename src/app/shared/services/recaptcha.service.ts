import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/environment';


declare const grecaptcha: {
  ready(callback: () => void): void;
  execute(
    siteKey: string,
    options: { action: string }
  ): Promise<string>;
};

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  execute(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined') {
        reject(new Error('reCAPTCHA non è stato caricato.'));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(environment.recaptchaSiteKey, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  }
}