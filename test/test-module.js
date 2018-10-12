export const greet = (msg = greeting()) => {
  console.log(msg);
};

export const greeting = () => {
  return "Hello, World!";
};
