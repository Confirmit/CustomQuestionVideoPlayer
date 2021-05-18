export const transformCssStyles = (styles) =>
  Object.keys(styles)
    .map((name) => (styles[name] ? `${name}:${styles[name]}` : ""))
    .filter((value) => !!value)
    .join(";");
