import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsComponent } from './pins.component';
import { RepositoryService } from '../../services/repository.service';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { PINS } from '../../services/mocks/pins';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    const strPins = JSON.stringify(PINS);
    this.observer.next(JSON.parse(strPins));
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed() {
        return of(true);
      }
    }
  }
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();

  resolve(action) {
    this.observer.next(action);
  }
}


fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinsComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when new page is open', () => {
    const url = 'https://platzi.com'
    const open = spyOn(window, 'open');

    component.openUrl(url);

    expect(open).toHaveBeenCalledWith(url, '_blank');
  });

  it('when update progress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open');
    const pinService = TestBed.get(PinsService);

    pinService.resolve('save');

    const newPin = [];
    newPin.push(pin._id);
    pin._id = null;
    newPin.push(pin);

    expect(updatePin).toHaveBeenCalledWith(newPin);
    expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
      duration: 2000
    });
  });
});
