import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContactScreenComponent } from './no-contact-screen.component';

describe('NoContactScreenComponent', () => {
  let component: NoContactScreenComponent;
  let fixture: ComponentFixture<NoContactScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContactScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContactScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
