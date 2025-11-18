import {getActiveProject,saveToStorage} from "./projectManager.js";
import {deleteTodo, addTodo} from "./project.js";
import {createTodo} from "./todo.js";
export function renderTodos(){
    const todoList=document.querySelector("#todo-list");
    todoList.innerHTML="";

    const project=getActiveProject();
    if(!project)return;

    project.todos.forEach(todo=>{
        const item=document.createElement("div");
        item.classList.add("todo-item");

        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=todo.completed;

        const title=document.createElement("span");
        title.textContent=todo.title;

        if(todo.completed)title.style.textDecoration="line-through";
        title.addEventListener("click",()=>{
            startEditingTodo(title,todo);
        });


        const delBtn=document.createElement("button");
        delBtn.textContent="Delete";

        delBtn.addEventListener("click", ()=>{
        deleteTodo(project,todo.id);
        renderTodos();
    });
        checkbox.addEventListener("change", ()=>{
        todo.completed=checkbox.checked;
        renderTodos();
    });

        item.appendChild(checkbox);
        item.appendChild(title);
        item.appendChild(delBtn);
        todoList.appendChild(item);
    });
    
}

const addTodoBtn= document.querySelector("#add-todo");

addTodoBtn.addEventListener("click", ()=>{
    const project=getActiveProject();
    if(!project)return;
    const title=prompt("To-Do Name: ");
    if(!title)return;

    addTodo(project,createTodo(title));
    renderTodos();
});


function startEditingTodo(titleElement,todo){
    const input=document.createElement("input");
    input.type="text";
    input.value=todo.title;
    
    titleElement.replaceWith(input);
    input.focus();
    input.select();
    input.addEventListener("keydown",(e)=>{
        if(e.key==="Enter"){
            todo.title=input.value;
            saveToStorage();
            renderTodos();
        }
        if(e.key==="Escape"){
            saveToStorage();
            renderTodos();
        }
    });
    input.addEventListener("blur",()=>{
        todo.title=input.value;
        saveToStorage();
        renderTodos();
    })
}