export default class Base extends HTMLElement {
  template = document.createElement("template");

  render(style: string, content: string) {
    if (content === null) content = "";
    if (style === null) style = "";
    this.template.innerHTML = /* html */ `
      <style>${style}</style>
      ${content}
    `;
  }
}
