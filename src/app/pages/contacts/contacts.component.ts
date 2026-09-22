import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { RecaptchaService } from 'src/app/shared/services/recaptcha.service';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, SharedModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnDestroy {
  submitted = false;
  isSuccessModalOpen = false;

  isSending = false;
  

  readonly contactForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
      ],
    ],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly recaptchaService: RecaptchaService,
    private readonly contactService: ContactService,
    private readonly destroyRef: DestroyRef
  ) {}


  async onSubmit(): Promise<void> {
    // Evita doppi invii
    if (this.isSending) {
      return;
    }

    this.submitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;

    try {
      // 1. Otteniamo il token reCAPTCHA
      const recaptchaToken =
        await this.recaptchaService.execute('contact_form');

      // 2. Prepariamo i dati
      const formValue = this.contactForm.getRawValue();

      const payload = {
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        subject: formValue.subject ?? '',
        message: formValue.message ?? '',
        recaptchaToken,
      };

      // 3. Inviamo alla Lambda
      this.contactService.sendMessage(payload).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSending = false;
        })
      ).subscribe({
        next: () => {
          this.isSuccessModalOpen = true;
          this.contactForm.reset();
          this.submitted = false;
        },

        error: (error) => {
          console.error('Errore durante invio form:', error);
        },
      });

    } catch (error) {
      console.error('Errore reCAPTCHA:', error);
      this.isSending = false;
    }
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.isSuccessModalOpen = false;
    this.isSending = false;
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return Boolean(control?.invalid && (control.touched || this.submitted));
  }
}
