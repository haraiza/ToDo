import { Todo } from '../class';
import { todoList } from '../index';

// Referencias en el HTML element
//Crea constante para trabajar con ella. Esta hace referencia al todo-list
const divTodoList = document.querySelector('.todo-list');

const txtInput = document.querySelector('.new-todo');

// Se agrega condiciones al list`
export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // se crea un nuevo div que traera todo lo creado en el metodo
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    // Se agrega al todo-list SOLO el primer elemento hijo para que en vez de que todo salga de un 'div' saldra de un 'li'
    divTodoList.append(div.firstElementChild);
    return div;
}


// Eventos
txtInput.addEventListener('keyup', ( event ) => {
    // 13 es para ver si presiono Enter
    if(event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        crearTodoHtml(nuevoTodo);
        txtInput.value ='';
    }
});