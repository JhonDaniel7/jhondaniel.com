import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';

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
export class HomeComponent implements OnInit {
  isLabModalOpen = false;

  constructor() {}

  ngOnInit(): void {}

  openLabModal(): void {
    this.isLabModalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeLabModal(): void {
    this.isLabModalOpen = false;
    document.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isLabModalOpen) {
      this.closeLabModal();
    }
  }
}
