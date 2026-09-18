import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  readonly analytics = inject(AnalyticsService);
  analyticsChoice = this.analytics.analyticsEnabled();

  accept(): void {
    this.analytics.acceptAnalytics();
  }

  reject(): void {
    this.analytics.rejectAnalytics();
  }

  openPreferences(): void {
    this.analyticsChoice = this.analytics.analyticsEnabled();
    this.analytics.openPreferences();
  }

  savePreferences(): void {
    this.analytics.savePreferences(this.analyticsChoice);
  }
}
