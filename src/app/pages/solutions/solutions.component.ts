import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionsComponent {}
