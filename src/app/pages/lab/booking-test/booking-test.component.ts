import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-booking-test',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './booking-test.component.html',
  styleUrl: './booking-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingTestComponent {
  bookingConfirmed = false;

  readonly bookingForm = this.formBuilder.group({
    name: ['Mario Rossi', [Validators.required, Validators.minLength(2)]],
    email: ['mario.rossi@email.it', [Validators.required, Validators.email]],
    phone: ['328 123 4567', Validators.required],
    type: ['Consulenza online', Validators.required],
    date: ['18/09/2025', Validators.required],
    time: ['10:00', Validators.required],
    note: ['Vorrei parlare del mio progetto e capire quali soluzioni potrei esplorare.'],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  get bookingFirstName(): string {
    return this.bookingForm.controls.name.value?.split(' ')[0] || 'Mario';
  }

  confirmBooking(): void {
    this.bookingForm.markAllAsTouched();
    this.bookingConfirmed = this.bookingForm.valid;
  }
}
