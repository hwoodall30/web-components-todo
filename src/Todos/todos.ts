export const todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : [];
