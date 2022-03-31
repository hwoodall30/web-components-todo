import Base from "./Base";

const style = /*css*/ `
    :host {
        width: 100%;
        display: flex;
        height: 100%;
        box-shadow: 0 0 10px rgba(0,0,0,0.10);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        justify-content: center;
        align-items: center;
    }
    
    .Completed{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #e4e4e4;
    }

    `;

const content = /*html*/ `
        <div class="Completed">
          <slot name="completed"></slot>
        </div>
        `;

export class TodoCompleted extends Base {
  _root: ShadowRoot;
  _render = this.render.bind(this);

  constructor() {
    super();
    this.render(style, content);
    this._root = this.attachShadow({ mode: "open" });
    this._root!.appendChild(this.template.content.cloneNode(true));
  }
}
