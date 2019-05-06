import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

fdescribe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach( () => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach( () => {
    service = TestBed.get(ApiService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterAll( () => {
    service = null;
    injector = null;
    httpMock = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('Should execute GET', () => {
      const result = 'testing';

      service.get('/test')
        .subscribe( response => {
          expect(response).toBe(result);
        });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      //- console.log(req);
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });
  });
});
