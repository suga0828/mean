import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('AppRouting', () => {
  beforeAll( () => {
    console.log('beforeAll');
  })
  beforeEach( () => {
    console.log('beforeEach');
  })
  afterAll( () => {
    console.log('afterAll');
  })
  afterEach( () => {
    console.log('afterEach');
  })


  it('Should have app as path', () => {
    expect(routes[0].path).toBe('app');
  });
  it('Should match the children', () => {
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent
    });
  });
});