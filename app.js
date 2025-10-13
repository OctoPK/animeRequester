import { getJSON, setAPI, changerURL, resetURL } from "./js/ApiHandler.js";

const resultDisplay = document.getElementById("result");
const effacerBtn = document.getElementById("effacer");
const parametre = document.getElementById("parametre");
const rechercheType = document.getElementById("recherche");
const submitBtn = document.getElementById("submit");
const titre = document.getElementById("titre");
const sombre = document.getElementById("sombre");
const choixGenres = document.getElementById("choixGenres");
const section = document.getElementById("section");
const checkbox = document.getElementsByTagName("checkbox");


let cpt = 0;

let JSONFile;
let JSONTrie;
sessionStorage["couleur"] = "clair";

choixGenres.style.display = "none";




function afficheAnime (){
    section.innerHTML = "";

    let anime = [];

    if (rechercheType.value == "nom"){
        anime = JSONTrie["data"];
    }
    if (rechercheType.value == "identifiant" || rechercheType.value == "classement"){
        anime = [JSONTrie]
    }

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


document.addEventListener('keydown', function(event) {
    if(event.key  === 'Enter'){
        event.preventDefault();
        if (rechercheType.value == "nom") afficherNom();
        if (rechercheType.value == "identifiant") afficherID();
        if (rechercheType.value == "classement") afficherClassement();
        
    }
});

effacerBtn.addEventListener("click", (event) => {
	event.preventDefault();
    parametre.value = "";
});

submitBtn.addEventListener("click", () => {
    if (rechercheType.value == "nom") afficherNom();
    if (rechercheType.value == "identifiant") afficherID();
    if (rechercheType.value == "classement") afficherClassement();
    if (rechercheType.value == "genres") afficherGenre();
});

const forms = document.querySelectorAll(".form-container");

sombre.addEventListener("click", () => {
    let articles = document.querySelectorAll("article");
    if (sessionStorage["couleur"] == "clair") {
        document.body.style.backgroundColor = "DarkGrey";
        document.body.style.color = "White";
        sombre.textContent = "Mode clair";
        sombre.style.backgroundColor = "White";
        sombre.style.color = "Black";
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
    afficheAnime();
}

async function afficherID() {
    resetURL();
    changerURL("id", parametre.value);
    JSONTrie = await getJSON();
    afficheAnime();
}

async function afficherClassement() {
    resetURL();
    changerURL("ranking", parametre.value);
    JSONTrie = await getJSON();
    afficheAnime();
}

async function afficherGenre() {
    resetURL();
    changerURL("name", parametre.value);
    JSONTrie = await getJSON();
    afficheAnime();
}



setAPI();

