import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DevComponent} from './dev.component';

xdescribe('DevComponent', () => {
  let component: DevComponent;
  let fixture: ComponentFixture<DevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
