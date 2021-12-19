export const ErrorToText: (x: Error) => string = (x) => `${x.name} : ${x.message}`;
