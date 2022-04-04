export class Todo {
  id: number = 0;
  value: string = "";
  completed: boolean = false;
}

export class TodoStore {
  static #instance: any;

  todos: Todo[] = [];

  constructor() {
    if (TodoStore.#instance) {
      return TodoStore.#instance;
    }
    TodoStore.#instance = this;
  }
}
