import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BookingTestComponent } from './booking-test/booking-test.component';
import { CustomerManagementTestComponent } from './customer-management-test/customer-management-test.component';
import { DocumentUploadTestComponent } from './document-upload-test/document-upload-test.component';
import { FormsTestComponent } from './forms-test/forms-test.component';
import { PdfTestComponent } from './pdf-test/pdf-test.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [BookingTestComponent, CustomerManagementTestComponent, DocumentUploadTestComponent, FormsTestComponent, PdfTestComponent, TranslateModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LabComponent {}
