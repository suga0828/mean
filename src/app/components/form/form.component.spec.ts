import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

import { RepositoryService } from 'src/app/services/repository.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSnackBar } from '@angular/material';

import { of } from 'rxjs';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() { }
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

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub},
        { provide: NavigationService, useClass: NavigationServiceStub},
        { provide: MatSnackBar, useClass: MatSnackBarStub}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
