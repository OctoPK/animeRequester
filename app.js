import { getJSON, setAPI, changerURL, resetURL, getGenres } from "./js/ApiHandler.js";

const effacerBtn = document.getElementById("effacer");
const parametre = document.getElementById("parametre");
const rechercheType = document.getElementById("recherche");
const submitBtn = document.getElementById("submit");
const sombre = document.getElementById("sombre");
const choixGenres = document.getElementById("choixGenres");
const textInput = document.getElementById("textInput");
const section = document.getElementById("section");
const genreClass = document.getElementsByClassName("genre");



choixGenres.style.display = "none";

let JSONTrie;
let listGenresSelection = [];
sessionStorage["couleur"] = "clair";

async function selectionGenre(){
    choixGenres.innerHTML = "";
    const listGenres = await getGenres();
    let article = document.createElement("article");
    let titre = document.createElement("h3");
    titre.textContent = "Choix des genres : ";
    article.className = "genre-selection";
    article.appendChild(titre);
       for (let i = 0; i < listGenres.length; i++){
        let container = document.createElement("div");
        container.className = "genre-item";
        
        let input = document.createElement("input");
        input.type = "checkbox";
        input.className = "genre";
        input.value = listGenres[i]["_id"];
        input.name = listGenres[i]["_id"];
        input.id = "genre-" + i;
        
        let label = document.createElement("label");
        label.textContent = listGenres[i]["_id"];
        label.htmlFor = "genre-" + i;
        
        container.appendChild(input);
        container.appendChild(label);
        article.appendChild(container);
    }

    choixGenres.appendChild(article);
}


rechercheType.addEventListener('change', () => {
    parametre.value = "";
    listGenresSelection = [];
    changerAffichage();
})

function changerAffichage(){
    if (rechercheType.value == "genres"){
        selectionGenre();
        choixGenres.style.display = "block";
        textInput.style.display = "none";
    }
    if (rechercheType.value == "nom" || rechercheType.value == "identifiant" || rechercheType.value == "classement" ) {
        choixGenres.style.display = "none";
        textInput.style.display = "block";
    }
}

function afficheAnime (){

    section.innerHTML = "";

    let anime = [];

    if (rechercheType.value == "nom" || rechercheType.value == "genres"){
        anime = JSONTrie["data"];
    }
    if (rechercheType.value == "identifiant" || rechercheType.value == "classement"){
        anime = [JSONTrie]
    }

    console.log(anime);

    let taille = anime.length;
    
    for (let i = 0; i < taille; i++){
        let article = document.createElement("article");
        let nom = document.createElement("h2");
        let image = new Image();
        let synopsis = document.createElement("p");
        let genre = document.createElement("p");
        let classement = document.createElement("p");
        let nb_episodes = document.createElement("p");
        article.classList.add("anime");

        nom.textContent = anime[i]["title"];
        image.src = anime[i]["image"];
        synopsis.textContent = "Synopsis : " + anime[i]["synopsis"];
        genre.textContent = "Genres : " + anime[i]["genres"];
        classement.textContent = "Classement : " + anime[i]["ranking"];
        nb_episodes.textContent = "Nombres d'épisodes : " + anime[i]["episodes"];

        article.appendChild(nom);
        article.appendChild(image);
        article.appendChild(synopsis);
        article.appendChild(genre);
        article.appendChild(classement);
        article.appendChild(nb_episodes);
        section.appendChild(article);
    
    }

}

function afficherErreur(){
    section.innerHTML = "";
    let article = document.createElement("article");
    let nom = document.createElement("h2");
    nom.textContent = "Aucun résulat trouvé!";
    article.appendChild(nom);
    section.appendChild(article);
}


document.addEventListener('keydown', function(event) {
    if(event.key  === 'Enter'){
        event.preventDefault();
        if (rechercheType.value == "nom") afficherNom();
        if (rechercheType.value == "identifiant") afficherID();
        if (rechercheType.value == "classement") afficherClassement();
        if (rechercheType.value == "genres") afficherGenre();
    }
});

effacerBtn.addEventListener("click", (event) => {
	event.preventDefault();
    parametre.value = "";
    rechercheType.value = "nom";
    section.innerHTML = "";
    listGenresSelection = [];
    changerAffichage();
});

submitBtn.addEventListener("click", () => {
    if (parametre.value == "" && (rechercheType.value == "nom" || rechercheType.value == "identifiant" || rechercheType.value == "classement")){
        afficherErreur();
    }
    else {
        if (rechercheType.value == "nom") afficherNom();
        if (rechercheType.value == "identifiant") afficherID();
        if (rechercheType.value == "classement") afficherClassement();
        if (rechercheType.value == "genres") {
        for (let i = 0; i < genreClass.length; i++){
            if (genreClass[i].checked){
                listGenresSelection.push(genreClass[i].value);
            }
        }
        afficherGenre();
    
        }
    }
});

const forms = document.querySelectorAll(".form-container");

sombre.addEventListener("click", () => {
    let articles = document.querySelectorAll("article");
    let header = document.querySelector("header");
    if (sessionStorage["couleur"] == "clair") {
        document.body.style.backgroundColor = "DarkGrey";
        document.body.style.color = "White";
        sombre.textContent = "Mode clair";
        sombre.style.backgroundColor = "White";
        sombre.style.color = "Black";
        header.style.backgroundColor = "Grey";
        header.style.color = "white";
		forms.forEach((form) => {
			form.style.backgroundColor = "lightblue"; // Remplacez "lightblue" par la couleur souhaitée
			form.style.boxShadow = ("0 4px 8px rgba(0, 0, 0, 0.5)"); // Ajoute une ombre légère pour un effet de profondeur
		});
        articles.forEach((article) => {
            article.style.backgroundColor = "lightblue";
            article.style.boxShadow = ("0 4px 8px rgba(0, 0, 0, 0.5)"); 
        });
        
		sessionStorage["couleur"] = "sombre";
    } else {
        document.body.style.backgroundColor = "White";
        document.body.style.color = "Black";
        sombre.textContent = "Mode sombre";
        sombre.style.backgroundColor = "Black";
        sombre.style.color = "White";
        header.style.backgroundColor = "white";
        header.style.color = "black";
		forms.forEach((form) => {
			form.style.backgroundColor = "White";
			form.style.boxShadow = ("0 4px 8px rgba(0, 0, 0, 0.2)");
		});
        articles.forEach((article) => {
            article.style.backgroundColor = "White";
            article.style.boxShadow = ("0 4px 8px rgba(0, 0, 0, 0.2)");
        });
        sessionStorage["couleur"] = "clair";
    }
});

async function afficherNom() {
    resetURL();
    changerURL("name", parametre.value);
    changerURL("size", "10");
    JSONTrie = await getJSON();
    if (JSONTrie["data"].length == 0){
        afficherErreur();
    }
    else{
        afficheAnime();
    }
    
}

async function afficherID() {
    resetURL();
    changerURL("id", parametre.value);
    JSONTrie = await getJSON();
    console.log(JSONTrie);
    alert(JSONTrie);
    if (JSONTrie == -1){
        afficherErreur();
    }
    else{
        afficheAnime();
    }
}

async function afficherClassement() {
    resetURL();
    changerURL("ranking", parametre.value);
    JSONTrie = await getJSON();
    if (JSONTrie == -1){
        afficherErreur();
    }
    else{
        afficheAnime();
    }
}

async function afficherGenre() {
    resetURL();
    if (listGenresSelection.length > 0) {
        changerURL("genres", listGenresSelection.join(","));
        listGenresSelection = [];
    } else {
        afficherErreur();
        return; 
    }
    JSONTrie = await getJSON();
    afficheAnime();
}


setAPI();

