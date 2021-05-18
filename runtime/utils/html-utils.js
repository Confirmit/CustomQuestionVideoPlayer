export const appendDivWithContent = (container, html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  container.appendChild(div);
  return div;
};
