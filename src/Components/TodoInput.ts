import Base from './Base';

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

const template = /*html*/ `
        <form>
            <input type="text" placeholder="What needs to be done?" autofocus>
            <button>Add</button>
        </form>
        `;

export class TodoInput extends Base {
	constructor() {
		super();
		this.render(style, template);

		this._shadow!.querySelector('form')!.addEventListener('submit', (e: any) => {
			e.preventDefault();
			if (!this._shadow!.querySelector('input')!.value) return;
			const input = this._shadow!.querySelector('input') as HTMLInputElement;
			const value = input.value;
			const completed = false;
			this.dispatchEvent(
				new CustomEvent('add-todo', {
					bubbles: true,
					composed: true,
					detail: {
						value,
						completed,
					},
				})
			);
			input.value = '';
		});
	}
}
