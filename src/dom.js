import {projects, setActiveProject, getActiveProject, addProject, deleteProject} from "./projectManager.js";
import {renderTodos} from "./domTodos.js";

const addProjectBtn = document.querySelector("#add-project");
addProjectBtn.addEventListener("click", () => {
    const name = prompt("Project Name: ");
    if(!name) return;
    addProject(name);
    renderProjects(projects);
});

export function renderProjects(projectArray) {
    const projectList=document.querySelector("#project-list");
    projectList.innerHTML= "";

    projectArray.forEach(project => {
        const item=document.createElement("div");
        const nameE1=document.createElement("span");
        nameE1.textContent=project.name;
        item.appendChild(nameE1);
        nameE1.addEventListener("click",(e)=>{
            e.stopPropagation();
            startEditingProject(nameE1,project);
        });
        item.classList.add("project-item");
        if(project.id===getActiveProject()?.id)item.classList.add("active");

        item.addEventListener("click", () =>{
            setActiveProject(project.id);
            renderProjects(projects);
            renderTodos();
        });
        const del=document.createElement("button");
        del.textContent="X";
        del.classList.add("delete-projec-btn");
        del.addEventListener("click",(e)=>{
            e.stopPropagation();
            deleteProject(project.id);
            renderProjects(projects);
            renderTodos();
        });
        item.addEventListener("click", () => {
        setActiveProject(project.id);
        renderProjects(projects);
        renderTodos();
});
        item.appendChild(del);


        projectList.appendChild(item);
    });

}

function startEditingProject(nameE1,project){
    const input=document.createElement("input");
    input.type="text";
    input.value=project.name;

    nameE1.replaceWith(input);
    input.focus();
    input.select();

    function finish(){
        project.name=input.value;
        renderProjects(projects);
        renderTodos();
    }

    input.addEventListener("keydown",(e)=>{
        if(e.key==="Enter")finish();
        if(e.key==="Escape")renderProjects(projects);
    });
    input.addEventListener("blur",finish);
}