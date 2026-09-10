import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cadastros } from './cadastros';

describe('Cadastros', () => {
  let component: Cadastros;
  let fixture: ComponentFixture<Cadastros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastros],
    }).compileComponents();

    fixture = TestBed.createComponent(Cadastros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
