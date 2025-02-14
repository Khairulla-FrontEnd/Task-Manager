import { environment } from "./environments/environment.js";

const apiKey = environment.apiKey;

window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3500', {
        headers:{
            "API_KEY":apiKey
        }
    })
    .then(val => val.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));
});