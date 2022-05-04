export default class Base extends HTMLElement {
	_shadow: any;
	_template = document.createElement('template');

	constructor() {
		super();
	}

	render(style: string = '', content: string = '') {
		this._shadow = this.attachShadow({ mode: 'open' });
		if (content === null) content = '';
		if (style === null) style = '';
		this._template.innerHTML = '';
		this._template.innerHTML = /* html */ `
      <style>${style}</style>
      ${content}
    `;

		//Add a way to replace shadowRoot with a new one so that I can call the render function again

		this._shadow!.appendChild(this._template.content.cloneNode(true));

		console.log('Rendered:', this);
	}
}

//TODO: Add a way to replace shadowRoot with a new one so that I can call the render function again
