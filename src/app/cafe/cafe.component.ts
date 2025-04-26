import { Component, OnInit } from '@angular/core';
import { CafeService } from './cafe.service';
import { Cafe } from './cafe';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../common/empty-state.component';
import { ErrorStateComponent } from '../common/error-state.component';
import { LoadingStateComponent } from '../common/loading-state.component';

@Component({
  selector: 'app-cafe',
  standalone: true,
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css'],
  imports: [
    CommonModule,
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
  ],
})
export class CafeComponent implements OnInit {
  cafes: Cafe[] = [];
  loading = false;
  hasError = false;
  totalOrigen = 0;
  totalBlend = 0;

  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.fetchCafes();
  }

  fetchCafes(): void {
    this.loading = true;
    this.hasError = false;

    this.cafeService.getCafes().subscribe({
      next: (data) => {
        this.cafes = data;
        this.totalOrigen = data.filter((c) =>
          c.tipo.toLowerCase().includes('origen')
        ).length;
        this.totalBlend = data.filter((c) =>
          c.tipo.toLowerCase().includes('blend')
        ).length;
        this.loading = false;
      },
      error: () => {
        this.hasError = true;
        this.loading = false;
      },
    });
  }
}
