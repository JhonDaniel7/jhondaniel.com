import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-test',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms-test.component.html',
  styleUrl: './forms-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsTestComponent {
  basicSubmitted = false;
  smartSubmitted = false;

  readonly basicForm = this.formBuilder.group({ name: ['Ma'], email: ['mario@'], phone: ['123'], password: ['123'] });
  readonly smartForm = this.formBuilder.group({
    name: ['Mario Rossi', [Validators.required, Validators.minLength(2)]],
    email: ['mario@gmail', [Validators.required, Validators.email]],
    phone: ['123', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
    password: ['Password123', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}
  submitBasicForm(): void { this.basicSubmitted = true; }
  submitSmartForm(): void { this.smartSubmitted = true; this.smartForm.markAllAsTouched(); }
  hasSmartError(controlName: string): boolean { const control = this.smartForm.get(controlName); return Boolean(control?.invalid && (control.touched || this.smartSubmitted)); }
  meetsPasswordRule(rule: 'length' | 'uppercase' | 'number'): boolean {
    const password = this.smartForm.controls.password.value ?? '';
    if (rule === 'length') return password.length >= 8;
    if (rule === 'uppercase') return /[A-Z]/.test(password);
    return /\d/.test(password);
  }
}
