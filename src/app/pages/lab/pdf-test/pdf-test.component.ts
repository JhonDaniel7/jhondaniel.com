import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pdf-test',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './pdf-test.component.html',
  styleUrl: './pdf-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfTestComponent {
  documentGenerated = false;

  readonly documentForm = this.formBuilder.group({
    type: ['Preventivo'],
    clientName: ['Mario Rossi', Validators.required],
    clientEmail: ['mario.rossi@email.it', [Validators.required, Validators.email]],
    subject: ['Sviluppo sito web aziendale', Validators.required],
    description: ['Sito web vetrina con gestione contenuti, responsive e ottimizzato per i motori di ricerca.'],
    amount: ['1500,00', Validators.required],
    vat: ['22%'],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  generateDocument(): void {
    this.documentForm.markAllAsTouched();
    this.documentGenerated = this.documentForm.valid;
  }

  downloadDocument(): void {
    const values = this.documentForm.getRawValue();
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${this.escapeHtml(values.type ?? 'Documento')}</title></head><body><h1>JD JHON DANIEL</h1><h2>${this.escapeHtml(values.type ?? '')}</h2><p><strong>Cliente:</strong> ${this.escapeHtml(values.clientName ?? '')}</p><p><strong>Email:</strong> ${this.escapeHtml(values.clientEmail ?? '')}</p><p><strong>Oggetto:</strong> ${this.escapeHtml(values.subject ?? '')}</p><p>${this.escapeHtml(values.description ?? '')}</p><hr><p><strong>Totale:</strong> ${this.escapeHtml(values.amount ?? '')} EUR</p></body></html>`;
    const file = new Blob([documentHtml], { type: 'text/html' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'documento-jhon-daniel.html';
    link.click();
    URL.revokeObjectURL(url);
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    })[character] ?? character);
  }
}
