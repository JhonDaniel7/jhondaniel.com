import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, take } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {


  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router
  ) {
    
  }

  ngOnInit(): void {
    // this.translate.use('it'); // Imposta la lingua su italiano

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const isPageRefresh = navigationEntry?.type === 'reload';

    if (isPageRefresh) {
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        take(1)
      ).subscribe((event) => {
        if (event.urlAfterRedirects !== '/') {
          void this.router.navigateByUrl('/');
        }
      });
    }
  }
}
