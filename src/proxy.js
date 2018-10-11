export const proxy = (obj) => {

  return new Proxy(obj, {
    get: (target, propKey) => {
      if (typeof target[propKey] === 'function') {
        console.log(`${propKey} was detected to be a function.`);
        return new Proxy(target[propKey], {
              apply: (target, thisArg, argumentList) => {
                console.log(target);
                console.log(thisArg);
                console.log(argumentList);
                return Reflect.apply(target, thisArg, argumentList);
              }
            }
        )
      }

      if (target.hasOwnProperty(propKey)) {
        console.log(`Reading property of ${target.constructor.name}.${propKey}`);
        console.log(`Value: ${target[propKey]}`);
      }


      return target[propKey];
    }
  });
};
