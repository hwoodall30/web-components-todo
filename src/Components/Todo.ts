import Base from './Base';
import { TodoStore } from '../Todos/todos';

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

const template = /*html*/ `
        <li class="Todo">
          <slot name="value"></slot>
          <span>
           <img src="/delete.svg" class="Delete" alt="Delete"/>
          </span>
        </li>
        `;

export class Todo extends Base {
	_todos: any = new TodoStore().todos;
	constructor() {
		super();
		this.render(style, template);
	}

	connectedCallback() {
		// Click event on span (delete) element to dispatch delete-todo event
		this._shadow.querySelector('span')!.addEventListener('click', (e: any) => {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('delete-todo', {
					bubbles: true,
					composed: true,
					detail: this,
				})
			);
		});

		//click event on todo to dispatch complete-todo event and set todo as completed
		this._shadow.querySelector('.Todo')!.addEventListener('click', (e: any) => {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('complete-todo', {
					bubbles: true,
					composed: true,
					detail: this,
				})
			);
		});
	}
	// Runs right after component is unmounted from dom
	disconnectedCallback() {
		this._shadow.querySelector('li')!.animate({
			transform: ['translateX(100%)', 'translateX(0%)'],
		});

		console.log('disconnected');

		// Remove Click event on span (delete) element to dispatch delete-todo event
		this._shadow.querySelector('span')!.removeEventListener('click', (e: any) => {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('delete-todo', {
					bubbles: true,
					composed: true,
					detail: this,
				})
			);
		});

		// Remove Click event on todo to dispatch complete-todo event and set todo as completed
		this._shadow.querySelector('.Todo')!.removeEventListener('click', (e: any) => {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('complete-todo', {
					bubbles: true,
					composed: true,
					detail: this,
				})
			);
		});
	}
}
