import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  currentLanguage = 'it';
  isMenuOpen = false;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || 'it';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    console.log('Navbar menu chiuso');
    document.getElementById('mainNavbar')?.classList.remove('show');
  }

  switchLanguage(language: string): void {
    if (language === this.currentLanguage) {
      return;
    }

    this.translate.use(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }
}
