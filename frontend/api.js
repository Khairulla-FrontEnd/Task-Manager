import { environment } from "./environments/environment.js";

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

async function getAllTasks(){
    try{
        return await fetch(apiUrl + "/tasks",{
            headers:{
                API_KEY:apiKey
            },
            method:"GET",
        })
        .then(val => val.json())
        .catch(err => console.error(err));
    }catch(err){
        console.error(err);
        return err;
    }
}
async function createNewTask(task){
    try{
        return await fetch(apiUrl + "/tasks", {
            headers:{
                API_KEY:apiKey,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({
                "task":task
            })
        })
        .then(val => val.json())
        .catch(err => console.error(err));
    }catch(err){
        console.error(err);
        return err;
    }
}
async function updateTask(id, task){
    try{
        return await fetch(apiUrl + "/tasks", {
            headers:{
                API_KEY:apiKey,
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify({
                "id":id,
                "task":task
            })
        })
        .then(val => val.json())
        .catch(err => console.error(err));
    }catch(err){
        console.error(err);
        return err;
    }
}
async function deleteTask(id){
    try{
        return await fetch(apiUrl + "/tasks", {
            headers:{
                API_KEY:apiKey,
                "Content-Type":"application/json"
            },
            method:"DELETE",
            body:JSON.stringify({
                "id":id
            })
        })
        .then(val => val.json())
        .catch(err => console.error(err));
    }catch(err){
        console.error(err);
        return err;
    }
}

export default { getAllTasks, createNewTask, updateTask, deleteTask }