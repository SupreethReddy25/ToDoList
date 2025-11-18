import {createProject} from './project.js';

let projects=[];

let activeProjectId=null;

function setActiveProject(id){
    activeProjectId=id;
    saveToStorage();
}

function getActiveProject(){
    return findProject(activeProjectId);
}

function addProject(name){
    const project=createProject(name);
    projects.push(project);
    saveToStorage();
    return project;    
}

function findProject(id){
    return projects.find((project) => project.id===id);
}

function deleteProject(id){
    let curdel=false;
    if(id===activeProjectId){
        curdel=true;
    }
    let filteredProjects=projects.filter((proj)=>proj.id!==id);
    projects.splice(0, projects.length, ...filteredProjects);
    if(curdel){
        if(projects.length>0)activeProjectId=projects[0].id;
        else activeProjectId=null;
    }
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem("projects",JSON.stringify(projects));
    localStorage.setItem("activeProjectId",activeProjectId);
}

function loadFromStorage(){
    const savedProjects=localStorage.getItem("projects");
    const savedActive=localStorage.getItem("activeProjectId");

    if(savedProjects){
        projects.splice(0,projects.length,...JSON.parse(savedProjects));
    }
    if(savedActive){
        activeProjectId=savedActive;
    }
}



export { addProject, deleteProject, findProject, setActiveProject, getActiveProject, projects,saveToStorage, loadFromStorage };
