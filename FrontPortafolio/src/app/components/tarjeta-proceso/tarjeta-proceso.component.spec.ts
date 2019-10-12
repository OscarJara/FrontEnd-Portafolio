import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaProcesoComponent } from './tarjeta-proceso.component';

describe('TarjetaProcesoComponent', () => {
  let component: TarjetaProcesoComponent;
  let fixture: ComponentFixture<TarjetaProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
