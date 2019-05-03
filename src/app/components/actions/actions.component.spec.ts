import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MatBottomSheetStub {
  dismiss() { }
}

class PinsServiceStub {
  resolveActionObserver(e) { }
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetStub},
        { provide: PinsService, useClass: PinsServiceStub},        
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open', () => {
    const action = 'any';
    const event = new MouseEvent('click');
    const openLink = spyOn((<any>component).bottomSheetRef, 'dismiss');

    component.openLink(event, action);

    expect(openLink).toHaveBeenCalledWith(event, action);
  });
});
