import { Todo } from '../class';
import { todoList } from '../index';

// Referencias en el HTML element
//Crea constante para trabajar con ella. Esta hace referencia al todo-list
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


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
txtInput.addEventListener('keyup', (event) => {
    // 13 es para ver si presiono Enter
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId); //Elimina la tarea del listado pero aun se sigue mirando
        divTodoList.removeChild(todoElemento); //Quita la tarea para que no sea vista 
    }

});


btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }

})


ulFiltors.addEventListener('click', (event) => {
    const filtro =event.target.text;

    if(!filtro){return;}

    for ( const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        anchorFiltros.forEach(elem => elem.classList.remove('selected'));
        event.target.classList.add('selected');



        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completado':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})