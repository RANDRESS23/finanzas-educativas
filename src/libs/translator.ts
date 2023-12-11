export const translateDimensionName = (dimension: string) => {
  const translations: { [key: string]: string } = {
    First: "Primera",
    Second: "Segunda",
    Third: "Tercera",
  };

  return translations[dimension] || dimension;
};
