export class Mockatoo {

  mock(obj) {
    this.target = obj;
    this.rewired = new Map();

    let handler = {
      get: (target, propKey) => {
        console.log(`target ${target}`);
        console.log(`propkey ${propKey}`)


        if (propKey === '__rewire__') {
          return (...args) => {
            this.__rewire__(args[0], args[1]);
          }
        } else if (propKey === '__getTargetType__') {
          return (...args) => {
            return Reflect.apply(this.__getTargetType__, this, []);
          }
        }

        if (typeof target[propKey] === 'function') {
          if (propKey === '__rewire__') {
            // skip!
            return;
          }

          const rewiredMethod = this.rewired.get(propKey);
          if (undefined !== rewiredMethod) {
            return (...args) => {
              // console.log(`target ${rewiredMethod}, thisArg ${Object.keys(this.target)}, args ${args}`);
              return Reflect.apply(rewiredMethod, this.target, args);
            };
          } else {
            console.warn(`${propKey} is not a rewired method! Delegating to actual object..`);
          }

          return new Proxy(target[propKey], {
                apply: (target, thisArg, argumentList) => {
                  return Reflect.apply(target, thisArg, argumentList);
                }
              }
          )
        }

        // TODO: Needs a review! Likely rework!
        if (target.hasOwnProperty(propKey)) {
          console.log(`Reading property of ${target.constructor.name}.${propKey}`);
          console.log(`Value: ${target[propKey]}`);
        }

        return target[propKey];
      }
    };

    return new Proxy(this.target, handler);
  }

  __rewire__(functionName, replacement) {
    this.rewired.set(functionName, replacement);
  }

  __getTargetType__() {
    let targetType = (typeof this.target);
    return targetType;
  }

}
