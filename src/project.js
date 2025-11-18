import {saveToStorage} from "./projectManager.js";

function createProject(name) {
    return{
        id:Date.now().toString(),
        name:name,
        todos:[]
    };
    
}

function addTodo(project,todo){
    project.todos.push(todo);
    saveToStorage();
}

function deleteTodo(project,todoId){
    project.todos=project.todos.filter((todo)=>todo.id!==todoId);
    saveToStorage();
}


export {addTodo,createProject,deleteTodo};