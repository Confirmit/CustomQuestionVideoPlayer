import { transformCssStyles } from "../utils/styles-transformer";
import { appendDivWithContent } from "../utils/html-utils";

const YoutubePlayer = (container, link, styles) => {
  const transformedLink = link.replace("watch?v=", "embed/");
  const inlineStyles = transformCssStyles(styles);
  const html = `<iframe style="${inlineStyles}" src="${transformedLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  appendDivWithContent(container, html);
};

export default YoutubePlayer;
