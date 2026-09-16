import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, NavbarComponent, FooterComponent, ModalComponent, TranslateModule],
  exports: [NavbarComponent, FooterComponent, ModalComponent],
})
export class SharedModule {}
