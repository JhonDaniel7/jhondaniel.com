import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, SharedModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  submitted = false;
  isSuccessModalOpen = false;

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

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSuccessModalOpen = true;
    this.contactForm.reset();
    this.submitted = false;
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return Boolean(control?.invalid && (control.touched || this.submitted));
  }
}
