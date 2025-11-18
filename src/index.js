
import { loadFromStorage,projects } from "./projectManager.js";
import { renderProjects } from "./dom.js";
import { renderTodos } from "./domTodos.js";


loadFromStorage();
renderProjects(projects);
renderTodos();
