import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  imports: [CommonModule, ContactsRoutingModule, ContactsComponent],
})
export class ContactsModule {}
