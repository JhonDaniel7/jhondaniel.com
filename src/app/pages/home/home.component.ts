import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ServicesComponent } from '../services/services.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ServicesComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
