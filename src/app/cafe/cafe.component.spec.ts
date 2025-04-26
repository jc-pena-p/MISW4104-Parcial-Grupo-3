import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafeComponent } from './cafe.component';
import { CafeService } from './cafe.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cafe } from './cafe';

describe('CafeComponent', () => {
  let component: CafeComponent;
  let fixture: ComponentFixture<CafeComponent>;
  let cafeServiceSpy: jasmine.SpyObj<CafeService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<CafeService>('CafeService', ['getCafes']);

    await TestBed.configureTestingModule({
      imports: [CafeComponent, HttpClientTestingModule],
      providers: [{ provide: CafeService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeComponent);
    component = fixture.componentInstance;
    cafeServiceSpy = TestBed.inject(CafeService) as jasmine.SpyObj<CafeService>;

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
      {
        id: 3,
        nombre: 'Café 3',
        tipo: 'Blend',
        region: 'Huila',
        sabor: 'Dulce',
        altura: 1750,
        imagen: 'cafe3.jpg',
      },
    ];

    cafeServiceSpy.getCafes.and.returnValue(of(mockCafes));
  });

  it('debe crear el componente correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debe renderizar una tabla con encabezado y 3 filas de café', () => {
    fixture.detectChanges();

    const headerRow = fixture.debugElement.queryAll(
      By.css('table thead tr th')
    );
    expect(headerRow.length).toBeGreaterThanOrEqual(3);

    const dataRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(dataRows.length).toBe(3);
  });

  it('debe mostrar correctamente los totales de café', () => {
    fixture.detectChanges();

    expect(component.totalOrigen).toBe(1);
    expect(component.totalBlend).toBe(2);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const totalOrigenText =
      nativeElement.querySelector('p:nth-of-type(1)')?.textContent;
    const totalBlendText =
      nativeElement.querySelector('p:nth-of-type(2)')?.textContent;

    expect(totalOrigenText).toContain('1');
    expect(totalBlendText).toContain('2');
  });
});
