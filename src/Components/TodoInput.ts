import Base from "./Base";

const style = /*css*/ `
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    
    form{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0px 5px;
 
    }

    form input{
        flex: 1 1 auto;
        padding: 10px;
        height: 100%;
        border: none;
        outline: none;
    }

    form button{
      color: #0380f5;
      border: none;
      outline: none;
      background: transparent;
      height: 30px;
      width: 50px;
      font-weight: bold;
        transition: all .2s ease;
    }

    form button:hover{
        cursor: pointer;
        background: #eeecec;
        border-radius: 5px;
    }
    
    `;

const content = /*html*/ `
        <form>
            <input type="text" placeholder="What needs to be done?" autofocus>
            <button>Add</button>
        </form>
        `;

export class TodoInput extends Base {
  _root: ShadowRoot;
  _render = this.render.bind(this);

  constructor() {
    super();
    this.render(style, content);
    this._root = this.attachShadow({ mode: "open" });
    this._root!.appendChild(this.template.content.cloneNode(true));

    this._root!.querySelector("form")!.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this._root!.querySelector("input")!.value) return;
      const input = this._root!.querySelector("input") as HTMLInputElement;
      const value = input.value;
      const completed = false;
      this.dispatchEvent(
        new CustomEvent("add-todo", {
          bubbles: true,
          composed: true,
          detail: {
            value,
            completed,
          },
        })
      );
      input.value = "";
    });
  }
}
