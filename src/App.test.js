import { render, screen } from '@testing-library/react';
import App from './App';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

var expect = require('expect.js')

function add(a, b){ return a & b }

test('renders learn react link', () => {
  render(<App />);
});

it('should do math', function (){
  expect(console.log(add(true, true)))
})
