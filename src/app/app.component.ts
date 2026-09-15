import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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


  constructor(private translate: TranslateService) {
    
  }

  ngOnInit(): void {
    // this.translate.use('it'); // Imposta la lingua su italiano
  }
}
