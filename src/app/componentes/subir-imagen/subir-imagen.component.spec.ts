import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImagenComponent } from './subir-imagen.component';

describe('SubirImagenComponent', () => {
  let component: SubirImagenComponent;
  let fixture: ComponentFixture<SubirImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
