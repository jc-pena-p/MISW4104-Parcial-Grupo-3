import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CafeService } from './cafe.service';
import { Cafe } from './cafe';
import { environment } from '../../environments/environment';

describe('CafeService', () => {
  let service: CafeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CafeService],
    });

    service = TestBed.inject(CafeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener una lista de cafés', () => {
    const mockCafes: Cafe[] = [
      {
        id: 1,
        nombre: 'Café 1',
        tipo: 'Blend',
        region: 'Antioquia',
        sabor: 'Suave',
        altura: 1800,
        imagen: 'cafe1.jpg',
      },
      {
        id: 2,
        nombre: 'Café 2',
        tipo: 'Café de Origen',
        region: 'Caldas',
        sabor: 'Fuerte',
        altura: 1900,
        imagen: 'cafe2.jpg',
      },
    ];

    service.getCafes().subscribe((cafes) => {
      expect(cafes.length).toBe(2);
      expect(cafes).toEqual(mockCafes);
    });

    const req = httpTestingController.expectOne(environment.baseUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(mockCafes);
  });
});
