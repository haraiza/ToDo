import './styles.css';
import { Todo, TodoList } from './class';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

const tarea = new Todo('Aprender Javascript11?');


todoList.nuevoTodo(tarea)
console.log(todoList);

crearTodoHtml(tarea);