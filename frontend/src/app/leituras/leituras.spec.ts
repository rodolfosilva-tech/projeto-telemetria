import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeiturasComponent } from './leituras';

describe('LeiturasComponent', () => {
  let component: LeiturasComponent;
  let fixture: ComponentFixture<LeiturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeiturasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeiturasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
