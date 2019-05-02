import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionsComponent } from '../actions/actions.component';

class MatBottomSheetStub {
  open() { }
}

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [{ provide: MatBottomSheet, useClass: MatBottomSheetStub}],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([
        { path: '', component: LayoutComponent},
        { path: 'app/add', component: LayoutComponent}
      ])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should the editMode to false', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    fixture.ngZone.run( () => {
      (<any>component).router.navigate(['/']);

      fixture.whenStable().then( () => {
        expect(component.editMode).toBeFalsy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });

  it('Should the editMode to true', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();

    fixture.ngZone.run( () => {
      (<any>component).router.navigate(['/app/add']);

      fixture.whenStable().then( () => {
        expect(component.editMode).toBeTruthy();
        expect(verifyEditMode).toHaveBeenCalled();
      });
    });
  });

  it('Should open', () => {
    const open = spyOn((<any>component).bottomSheet, 'open');

    component.openBottomSheet();

    expect(open).toHaveBeenCalledWith(ActionsComponent);
  });
});
