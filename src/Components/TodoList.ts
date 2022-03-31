import Base from "./Base";
import { TodoCompleted } from "./CompletedTodos";
import { Todo } from "./Todo";
import { TodoInput } from "./TodoInput";

const style = /*css*/ `

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :host {
      width: 60%;
      height: 50%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 60px 1fr 60px;
      box-shadow: 0 0 10px rgba(0,0,0,0.25);
      border-radius: 10px;

    }
    
    ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: auto;
    }

  .Completed{
      color: #9e9e9e;
      text-decoration: line-through;
    }
    `;

const content = /*html*/ `
      <todo-input></todo-input>
      <ul>
       
      </ul>
      <todo-completed>
        <div slot="completed">Completed: 0</div>
      </todo-completed>
        `;

export class TodoList extends Base {
  _root: ShadowRoot;
  _render = this.render.bind(this);

  constructor() {
    super();
    this.render(style, content);
    this._root = this.attachShadow({ mode: "open" });
    this._root!.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    this._root.querySelector("todo-input")!.addEventListener("add-todo", (e) => {
      const todo = (e as CustomEvent).detail;
      const todoItem = document.createElement("todo-item");
      const todoItemSlot = document.createElement("div");
      todoItemSlot.slot = "value";
      todoItemSlot.innerText = todo;
      todoItem.appendChild(todoItemSlot);
      this._root.querySelector("ul")!.appendChild(todoItem);
    });

    this.addEventListener("delete-todo", (e) => {
      const todoItem = (e as CustomEvent).detail;
      todoItem.remove();
      const completedTodos = this._root.querySelectorAll(".Completed")!.length;
      this._root.querySelector("todo-completed")!.shadowRoot!.querySelector("div")!.innerText = `Completed: ${completedTodos}`;
    });

    this.addEventListener("complete-todo", (e) => {
      const todoItem = (e as CustomEvent).detail;
      todoItem.classList.toggle("Completed");
      const completedTodos = this._root.querySelectorAll(".Completed")!.length;
      this._root.querySelector("todo-completed")!.shadowRoot!.querySelector("div")!.innerText = `Completed: ${completedTodos}`;
    });
  }
}

customElements.define("todo-input", TodoInput);
customElements.define("todo-item", Todo);
customElements.define("todo-completed", TodoCompleted);
