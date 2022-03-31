import Base from "./Base";

const style = /*css*/ `
    :host {
        width: 100%;
        display: flex;
        height: 50px;
    }


    
    .Todo{
        width: 100%;
        height: 100%;
        min-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #e4e4e4;
        transition: all .2s ease;
        font-size: .9em;
        cursor: pointer
    }
   
  

    .Todo:hover{
        background: #f7f7f7;
    }

    span{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    span:hover{
      border-radius: 50%;
      background: #f0eeee;
    }

    .Delete{
        color: #f55003;
        font-size: 1.5em;
        cursor: pointer;
    }

    `;

const content = /*html*/ `
        <li class="Todo">
          <slot name="value"></slot>
          <span>
           <img src="/delete.svg" class="Delete" alt="Delete"/>
          </span>
        </li>
        `;

export class Todo extends Base {
  _root: ShadowRoot;
  _render = this.render.bind(this);

  constructor() {
    super();
    this.render(style, content);
    this._root = this.attachShadow({ mode: "open" });
    this._root!.appendChild(this.template.content.cloneNode(true));

    this._root.querySelector("span")!.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("delete-todo", {
          bubbles: true,
          composed: true,
          detail: this,
        })
      );
    });

    this._root.querySelector(".Todo")!.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("complete-todo", {
          bubbles: true,
          composed: true,
          detail: this,
        })
      );
    });
  }
}
