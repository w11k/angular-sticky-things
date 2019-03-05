import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PosaContainerComponent} from './posa-container.component';

describe('PosaContainerComponent', () => {
  let component: PosaContainerComponent;
  let fixture: ComponentFixture<PosaContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PosaContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
