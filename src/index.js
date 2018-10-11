/**
 * Plugins that enables the rewiring of the functions from a specified ES6 module.
 */

export default (babel) => {
  return {
    visitor: {
      Identifier(path, state) {
        console.log('visiting Identifier..');
        //console.log("Path: ", path);
        //console.log("State: ", state);
      }
    }
  };
}
;
