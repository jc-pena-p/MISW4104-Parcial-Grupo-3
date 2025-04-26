import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center my-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">{{ message || 'Cargando...' }}</p>
    </div>
  `,
})
export class LoadingStateComponent {
  @Input() message?: string;
}
