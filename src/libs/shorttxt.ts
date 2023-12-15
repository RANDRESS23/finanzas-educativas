export const shorttxt: (
  txt: string,
  sz?: number,
  endDecorator?: string,
) => string = (txt, sz = 4, endDecorator = "...") => {
  return `${txt.split(" ").slice(0, sz).join(" ")}${endDecorator}`;
};
