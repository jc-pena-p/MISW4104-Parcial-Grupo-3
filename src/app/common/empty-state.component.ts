import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-warning text-center mt-4">
      <i class="bi bi-folder-x fs-1 d-block mb-2"></i>
      <p class="mb-0">{{ message || 'No hay datos registrados aún.' }}</p>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() message?: string;
}
