import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { SolutionsComponent } from '../solutions/solutions.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, RouterLink, ServicesComponent, SolutionsComponent, TranslateModule],
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
