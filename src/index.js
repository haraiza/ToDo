import './styles.css';
import { TodoList } from './class';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();


todoList.todos.forEach( crearTodoHtml);
console.log('todos', todoList.todos);