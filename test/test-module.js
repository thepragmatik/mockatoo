export const greet = (msg = greeting) => {
  // console.log(msg);
  return msg();
};


export const greeting = () => {
  return "Hello, World!";
};
