import "./style.css";

// https://stackoverflow.com/questions/63481999/how-to-reference-to-a-method-in-parent-component-from-child-component-with-vanil
// https://dev.to/proticm/vanilla-js-data-binding-with-classes-from-scratch-48b1
// https://wc-todo.firebaseapp.com/
// https://github.com/shprink/web-components-todo/blob/master/native/js/my-todo.js
// https://dev.to/silvio/how-to-create-a-web-components-in-svelte-2g4j
// https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements

import { TodoList } from "./Components/TodoList";

customElements.define("todo-list", TodoList);
