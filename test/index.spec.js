import {transformFileSync} from '@babel/core';
import fs from 'fs';
import plugin from '../src/index';
import {trim} from './util';
import {proxy} from '../src/proxy';


describe('CommonJS Modules', () => {

  it('Referree should transform valid source', () => {
    const options = {
      babelrc: false,
      plugins: [plugin]
    };

    const actual = transformFileSync('./test/fixtures/commonjs/actual.js', options).code;
    // console.log(actual);

    const expected = fs.readFileSync('./test/fixtures/commonjs/expected.js').toString();
    // console.log(expected);

    expect(trim(actual)).toEqual(trim(expected));

  });

});

describe('ES6 Proxy', () => {

  it('should intercept all calls to the proxied Object', () => {
    let greeter = {
      greet: (msg) => {
        console.log(msg);
      }
    };

    console.log('===================');
    proxy(greeter).greet('hello');
  });

});
