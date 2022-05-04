import Base from './Base';
import { TodoCompleted } from './CompletedTodos';
import { Todo } from './Todo';
import { TodoInput } from './TodoInput';
import { TodoStore } from '../Todos/todos';

/* ---------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------  Style  ---------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------- */
const style = /*css*/ `

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :host {
      width: 70%;
      min-width: 330px;
      height: 50%;
      min-height: 500px;
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

    todo-item:nth-child(even){
        background: #f7f5f5;
    }
    `;

/* ---------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------  HTML  ----------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------- */
const template = (todos: any) => /*html*/ `
<todo-input></todo-input>
<ul>
 ${todos
		.map((todo: any) => {
			return `<todo-item>
              <div slot="value">${todo.value}</div>
     </todo-item>`;
		})
		.join('')}
</ul>
<todo-completed>
  <div slot="completed">Completed: 0</div>
</todo-completed>
        `;

/* ---------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------  Script  --------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------- */
export class TodoList extends Base {
	_todos: any = new TodoStore().todos;
	_todoListItem: string = ``;
	constructor() {
		super();
		this.render(style, template(this._todos));
	}

	// Runs when component is initialized
	connectedCallback() {
		// Add Todo Event Listener
		this._shadow.querySelector('todo-input')!.addEventListener('add-todo', (e: any) => {
			const todo = (e as CustomEvent).detail;
			//@ts-ignore
			this.addTodos(todo);
			// this.render(style, template(this._todos));
		});

		// Delete Todo Event Listener
		this.addEventListener('delete-todo', e => {
			const todoItem = (e as CustomEvent).detail;
			todoItem
				.animate([{ opacity: 1 }, { opacity: 0 }], {
					duration: 500,
					fill: 'forwards',
				})
				.finished.then(() => {
					const parent = todoItem.parentElement!;
					const indexofChild = parent.children
						? Array.from(parent.children).indexOf(todoItem)
						: () => {};
					this._todos.splice(indexofChild, 1);
					todoItem.remove();
					const completedTodos = this._shadow.querySelectorAll('.Completed')!.length;
					this._shadow
						.querySelector('todo-completed')!
						.shadowRoot!.querySelector('div')!.innerText = `Completed: ${completedTodos}`;
				});
			// this.render(style, template(this._todos));
		});

		//Complete Todo Event Listener
		this.addEventListener('complete-todo', e => {
			const todoItem = (e as CustomEvent).detail;
			const parent = todoItem.parentElement!;
			const indexofChild = Array.from(parent.children).indexOf(todoItem);
			this._todos.map((todo: any) => {
				if (indexofChild === this._todos.indexOf(todo)) {
					todo.completed = !todo.completed;
				}
				return todo;
			});
			todoItem.classList.toggle('Completed');
			const completedTodos = this._shadow.querySelectorAll('.Completed')!.length;
			this._shadow
				.querySelector('todo-completed')!
				.shadowRoot!.querySelector('div')!.innerText = `Completed: ${completedTodos}`;
		});
	}

	// Add Todo Function
	addTodos(todo: any) {
		this._todos.push({ id: this._todos.length + 1, value: todo.value, completed: todo.completed });
		this._todoListItem = ``;
		this._todoListItem = `<todo-item>
              <div slot="value">${todo.value}</div>
              </todo-item>`;

		this._shadow.querySelector('ul')!.insertAdjacentHTML('beforeend', this._todoListItem);
	}
}

// Define custom elements used in this component
customElements.define('todo-input', TodoInput);
customElements.define('todo-item', Todo);
customElements.define('todo-completed', TodoCompleted);
