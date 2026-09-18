import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-document-upload-test',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './document-upload-test.component.html',
  styleUrl: './document-upload-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentUploadTestComponent {
  selectedFileName = '';
  documentArchived = false;

  readonly uploadForm = this.formBuilder.group({
    documentType: ['Contratto', Validators.required],
    description: ['Contratto nuovo dipendente'],
  });

  readonly archivedDocuments = [
    { name: 'contratto_mario_2025-09-18.pdf', date: '18/09/2025', size: '320 KB' },
    { name: 'contratto_luca_2025-07-10.pdf', date: '10/07/2025', size: '298 KB' },
    { name: 'contratto_anna_2025-06-05.pdf', date: '05/06/2025', size: '310 KB' },
    { name: 'policy_aziendale.pdf', date: '25/05/2025', size: '450 KB' },
    { name: 'modulo_privacy.pdf', date: '01/04/2025', size: '280 KB' },
  ];

  constructor(private readonly formBuilder: FormBuilder) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFileName = input.files?.[0]?.name ?? '';
  }

  uploadDocument(): void {
    this.uploadForm.markAllAsTouched();
    this.documentArchived = Boolean(this.selectedFileName && this.uploadForm.valid);
  }

  chooseAnotherFile(): void {
    this.selectedFileName = '';
    this.documentArchived = false;
  }
}
