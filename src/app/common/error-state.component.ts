import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-center mt-5">
      <div
        class="alert alert-danger text-center w-100"
        style="max-width: 600px;"
      >
        <div class="mb-2">
          <i
            class="bi bi-exclamation-triangle-fill"
            style="font-size: 2.5rem;"
          ></i>
        </div>
        <h5 class="mb-2 fw-bold">¡Ups! Algo salió mal.</h5>
        <p class="mb-0">
          {{
            message ||
              'No pudimos completar la solicitud. Por favor, intenta más tarde.'
          }}
        </p>
      </div>
    </div>
  `,
})
export class ErrorStateComponent {
  @Input() message?: string;
}
