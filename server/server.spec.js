const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const request = require('request');
var requestPromise = require('request-promise-native');
const axios = require('axios');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/api', PinsRouter.router);
app.set('port', 3000);

describe('Testing Router', () => {
  let server;

  beforeAll( () => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll( () => {
    server.close();
  });

  describe('GET', () => {
    // GET 200
    it('200 and find pin', done => {
      const data = [{ id: 1 }];
      spyOn(Pins, 'find').and.callFake( callBack => {
        callBack(false, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      })
    });

    // GET 500
    it('500', done => {
      const data = [{ id: 1 }];
      spyOn(Pins, 'find').and.callFake( callBack => {
        callBack(true, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    });
  });

  describe('GET BY ID', () => {
    // GET 200 By ID
    it('500 and find by id pin', done => {
      const data = { id: 1};
      spyOn(Pins, 'findById').and.callFake( (id, callBack) => {
        data.param = id;
        callBack(true, data);
    });

    request.get('http://localhost:3000/api/1', (error, response, body) => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });

    // GET 500 By Id
    it('500', done => {
      const data = [{ id: 1 }];
      spyOn(Pins, 'find').and.callFake( callBack => {
        callBack(true, data);
    });

    request.get('http://localhost:3000/api', (error, response, body) => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
  });

  describe('POST', () => {
    // POST 200
    it('200', done => {
      const post = [{
        title: 'Platzi: Cursos online profesionales de tecnología',
        author: 'Platzi',
        description: 'Aprende desde cero a crear el futuro de la web. Cursos de Desarrollo, Diseño, Marketing, y Negocios.',
        percentage: 0,
        tags: [],
        assets: []
      }];
      
      spyOn(Pins, 'create').and.callFake( (pin, callBack) => {
        callBack(false, post);
      });

      spyOn(requestPromise, 'get').and.returnValue(
        //- No estamos probando este caso aún.
        Promise.resolve('.')
      );
      
      const assets = [{ url: 'https:platzi.com' }];

      //- El segundo parámetro es falso.
      axios.post('http://localhost:3000/api', {title: 'title', author: 'author', description: 'description', assets})
        .then( res => {
          expect(res.status).toBe(200);
          expect(res.data).toEqual(post);
          done();
        });
    });

    it('200 PDF', done => {      
      spyOn(Pins, 'create').and.callFake( (pin, callBack) => {
        callBack(false, {});
      });

      const assets = [{ url: 'https:platzi.pdf' }];

      //- El segundo parámetro es falso.
      axios.post('http://localhost:3000/api', {title: 'title', author: 'author', description: 'description', assets})
        .then( res => {
          expect(res.status).toBe(200);
          done();
        });
    });
  });

  describe('PUT', () => {
    // GET 200
    it('200 and update PIN', done => {
      const data = { id: 1 };
      spyOn(Pins, 'findByIdAndUpdate').and.callFake( (id, body, callBack) => {
        callBack(false, data);
      });

      request.put('http://localhost:3000/api/' + data.id, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      })
    });
  });
});