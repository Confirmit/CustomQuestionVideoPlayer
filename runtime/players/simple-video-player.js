import { transformCssStyles } from "../utils/styles-transformer";
import { appendDivWithContent } from "../utils/html-utils";

const SimplePlayer = (container, link, styles) => {
  const inlineStyles = transformCssStyles(styles);
  const html = `<video style="${inlineStyles}" src="${link}" controls></video>`;
  appendDivWithContent(container, html);
};

export default SimplePlayer;
