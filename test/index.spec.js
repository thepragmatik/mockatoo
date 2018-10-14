import {Mockatoo} from '../src/index';
import {greet, greeting} from './test-module';

describe('Referree', () => {

  describe('Should discover type on target', () => {

    it('in case the target is an object', () => {
      const targetToMock = {};

      const proxy = new Mockatoo().mock(targetToMock);

      expect(proxy.__getTargetType__()).toEqual('object');
    });

    it('in case the target is a function', () => {
      const targetToMock = () => {
      };

      const proxy = new Mockatoo().mock(targetToMock);

      expect(proxy.__getTargetType__()).toEqual('function');
    });

    it('in case the target is a class; it is evaluated to a function', () => {
      class targetToMock {
      }

      const proxy = new Mockatoo().mock(targetToMock);

      expect(proxy.__getTargetType__()).toEqual('function');
    });

  });

  describe('should let unmocked functions be invoked on actual object', () => {

    it('unmocked function (within Object literal)', () => {
      const targetToMock = {
        greet: () => "Hello, World!"
      };

      const proxy = new Mockatoo().mock(targetToMock);

      expect(proxy.greet()).toEqual("Hello, World!");
    });

    it('mocked function (within Object literal)', () => {
      const targetToMock = {
        greet: () => "Hello, World!"
      };

      const proxy = new Mockatoo().mock(targetToMock);

      proxy.__rewire__('greet', () => "Goodbye, World!");

      expect(proxy.greet()).toEqual("Goodbye, World!");
    });

    it('unmocked function (outside Object literal)', () => {
      const targetToMock = () => "Hello, World!";

      const proxy = new Mockatoo().mock(targetToMock);

      expect(proxy.targetToMock()).toEqual("Hello, World!");
    });


    it('mocked function (outside Object literal)', () => {
      const targetToMock = () => "Hello, World!";

      const proxy = new Mockatoo().mock(targetToMock);

      proxy.__rewire__('targetToMock', () => "Goodbye, World!");

      expect(proxy.targetToMock()).toEqual("Goodbye, World!");
    });

  });

  describe('should be able to mock imported modules/file', () => {

    it('mocked individual method from an imported file', () => {
      const proxy = new Mockatoo().mock({greeting, greet});

      proxy.__rewire__('greeting', () => "Yokoso, World!");

      // expect(proxy.greeting()).toEqual("Yokoso, World!");

      expect(proxy.greet(proxy.greeting)).toEqual("Yokoso, World!");
    });

    it('unmocked individual method from an imported file', () => {
      const proxy = new Mockatoo().mock({greeting});

      expect(proxy.greeting()).toEqual("Hello, World!");
    });

  });

});
