import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Customer, generateCustomers } from '../../../shared/utils';

@Component({
  selector: 'app-customer-management-test',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './customer-management-test.component.html',
  styleUrl: './customer-management-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerManagementTestComponent {
  readonly customers = generateCustomers(1000);
  readonly pageSizes = [10, 25, 50];
  searchTerm = '';
  genderFilter = 'all';
  ageFilter = 'all';
  pageSize = 10;
  currentPage = 1;
  sortColumn: keyof Customer = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  csvLoaded = false;

  get filteredCustomers(): Customer[] {
    const search = this.searchTerm.trim().toLocaleLowerCase();
    return this.customers
      .filter((customer) => {
        const matchesSearch = !search || [customer.nome, customer.cognome, customer.telefono].some((value) => value.toLocaleLowerCase().includes(search));
        const matchesGender = this.genderFilter === 'all' || customer.genere === this.genderFilter;
        const age = this.getAge(customer.dataNascita);
        const matchesAge = this.ageFilter === 'all' || (this.ageFilter === 'young' && age < 30) || (this.ageFilter === 'adult' && age >= 30 && age < 50) || (this.ageFilter === 'senior' && age >= 50);
        return matchesSearch && matchesGender && matchesAge;
      })
      .sort((first, second) => this.compareCustomers(first, second));
  }

  get visibleCustomers(): Customer[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCustomers.length / this.pageSize));
  }

  get firstVisibleIndex(): number {
    return this.filteredCustomers.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastVisibleIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredCustomers.length);
  }

  setSearchTerm(value: string): void {
    this.searchTerm = value;
    this.resetPage();
  }

  setFilters(): void {
    this.resetPage();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.genderFilter = 'all';
    this.ageFilter = 'all';
    this.resetPage();
  }

  changePage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
  }

  changePageSize(value: string): void {
    this.pageSize = Number(value);
    this.resetPage();
  }

  sortBy(column: keyof Customer): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  loadCsv(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.csvLoaded = Boolean(input.files?.length);
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const date = new Date(birthDate);
    let age = today.getFullYear() - date.getFullYear();
    const beforeBirthday = today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
    if (beforeBirthday) age--;
    return age;
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('it-IT').format(new Date(`${value}T00:00:00`));
  }

  private compareCustomers(first: Customer, second: Customer): number {
    const firstValue = first[this.sortColumn];
    const secondValue = second[this.sortColumn];
    const comparison = String(firstValue).localeCompare(String(secondValue), 'it', { numeric: true });
    return this.sortDirection === 'asc' ? comparison : -comparison;
  }

  private resetPage(): void {
    this.currentPage = 1;
  }
}
