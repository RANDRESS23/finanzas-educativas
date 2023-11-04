export const shorttxt: (txt: string) => string = (txt) => {
  return txt.split(" ").slice(0, 4).join(" ").concat("...");
};
