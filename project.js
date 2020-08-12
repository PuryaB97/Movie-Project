const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// Install All Element

addEventListener();

function addEventListener(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if( title === "" || director === "" || url === ""){
        // Error
        UI.displayMessages("Fill in All Fields...","danger");
    }
    else {
        // New Movie
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm); // Add film to UI
        Storage.addFilmToStorage(newFilm); // Add Movie to Storage
        UI.displayMessages("Movie Successfully Added!","success");
    }




    UI.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}

function deleteFilm(e){

    if (e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Deletion succeeded..","success");
        
    }
}
function clearAllFilms(){

    if(confirm("Are You Sure ?")){
        UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }
    
}