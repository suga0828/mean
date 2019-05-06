import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

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

    it('Should execute GET with Headers', () => {
      const headers = new HttpHeaders().set('platzi-headers', 'alexander-rules')
      const result = 'testing';

      service.get('/test', headers)
        .subscribe( response => {
          expect(response).toBe(result);
        });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      //- console.log(req);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('platzi-headers')).toBe('alexander-rules')
      req.flush(result);
    });
  });

  describe('POST', () => {
    it('Should execute POST', () => {
      const result = 'testing';

      service.post('/test', {})
        .subscribe( response => {
          expect(response).toBe(result);
        });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      //- console.log(req);
      expect(req.request.method).toBe('POST');
      req.flush(result);
    });
  });

  describe('PUT', () => {
    it('Should execute PUT', () => {
      const result = 'testing';

      service.put('/test', {})
        .subscribe( response => {
          expect(response).toBe(result);
        });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      //- console.log(req);
      expect(req.request.method).toBe('PUT');
      req.flush(result);
    });
  });

  describe('DELETE', () => {
    it('Should execute DELETE', () => {
      const result = 'testing';

      service.delete('/test', {})
        .subscribe( response => {
          expect(response).toBe(result);
        });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      //- console.log(req);
      expect(req.request.method).toBe('DELETE');
      req.flush(result);
    });
  });
});
