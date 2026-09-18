import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface GtagWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

type ConsentChoice = 'accepted' | 'rejected';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly storageKey = 'jd-cookie-consent';
  private readonly measurementId = 'G-M6CNVZD1W6';
  private readonly browser: boolean;
  private analyticsLoaded = false;
  private consentChoice: ConsentChoice | null = null;

  readonly bannerVisible = signal(false);
  readonly preferencesVisible = signal(false);
  readonly analyticsEnabled = signal(false);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
    private readonly router: Router,
  ) {
    this.browser = isPlatformBrowser(platformId);
    if (!this.browser) return;

    this.initializeConsentMode();
    this.consentChoice = this.readConsent();
    this.analyticsEnabled.set(this.consentChoice === 'accepted');
    this.bannerVisible.set(this.consentChoice === null);

    if (this.consentChoice === 'accepted') {
      this.loadAnalytics();
    }

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.trackPageView(event.urlAfterRedirects));
  }

  acceptAnalytics(): void {
    this.saveConsent('accepted');
  }

  rejectAnalytics(): void {
    this.saveConsent('rejected');
  }

  savePreferences(analyticsEnabled: boolean): void {
    this.saveConsent(analyticsEnabled ? 'accepted' : 'rejected');
  }

  openPreferences(): void {
    this.preferencesVisible.set(true);
    this.bannerVisible.set(true);
  }

  closePreferences(): void {
    this.preferencesVisible.set(false);
    if (this.consentChoice !== null) this.bannerVisible.set(false);
  }

  trackEvent(eventName: string, params?: Record<string, string | number | boolean>): void {
    if (!this.browser || !this.analyticsEnabled() || !window.gtag) return;
    window.gtag('event', eventName, params ?? {});
  }

  private saveConsent(choice: ConsentChoice): void {
    this.consentChoice = choice;
    this.analyticsEnabled.set(choice === 'accepted');
    this.writeConsent(choice);
    this.updateConsentMode(choice === 'accepted');
    if (choice === 'accepted') this.loadAnalytics();
    this.preferencesVisible.set(false);
    this.bannerVisible.set(false);
  }

  private initializeConsentMode(): void {
    const gtagWindow = window as GtagWindow;
    gtagWindow.dataLayer = gtagWindow.dataLayer ?? [];
    gtagWindow.gtag = gtagWindow.gtag ?? ((...args: unknown[]) => gtagWindow.dataLayer?.push(args));
    gtagWindow.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
  }

  private updateConsentMode(analyticsGranted: boolean): void {
    window.gtag?.('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  private loadAnalytics(): void {
    if (this.analyticsLoaded) return;
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    this.document.head.appendChild(script);
    window.gtag?.('js', new Date());
    window.gtag?.('config', this.measurementId, { send_page_view: false });
    this.analyticsLoaded = true;
  }

  private trackPageView(url: string): void {
    if (!this.analyticsEnabled() || !window.gtag) return;
    window.gtag('event', 'page_view', { page_path: url, page_location: window.location.href });
  }

  private readConsent(): ConsentChoice | null {
    try {
      const value = window.localStorage.getItem(this.storageKey);
      return value === 'accepted' || value === 'rejected' ? value : null;
    } catch {
      return null;
    }
  }

  private writeConsent(choice: ConsentChoice): void {
    try {
      window.localStorage.setItem(this.storageKey, choice);
    } catch {
      // localStorage can be unavailable in restrictive browser contexts.
    }
  }
}
