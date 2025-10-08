import { getJSON, setAPI } from "./js/ApiHandler.js";

const resultDisplay = document.getElementById("result");
const effacerBtn = document.getElementById("effacer");
const parametre = document.getElementById("parametre");
const rechercheType = document.getElementById("recherche");
const submitBtn = document.getElementById("submit");
const titre = document.getElementById("titre");
const sombre = document.getElementById("sombre");

let cpt = 0;

effacerBtn.addEventListener("click", () => {
    parametre.value = "";
});

submitBtn.addEventListener("click", () => {
    if (recherche.value == "nom") afficherNom();
    if (recherche.value == "identifiant") afficherID();
    if (recherche.value == "classement") afficherClassement();
});

sombre.addEventListener("click", () => {
    if (cpt % 2 == 0) {
        document.body.style.backgroundColor = "DarkGrey";
        document.body.style.color = "White";
        sombre.textContent = "Mode clair";
        sombre.style.backgroundColor = "White";
        sombre.style.color = "Black";
        cpt++;
    } else {
        document.body.style.backgroundColor = "White";
        document.body.style.color = "Black";
        sombre.textContent = "Mode sombre";
        sombre.style.backgroundColor = "Black";
        sombre.style.color = "White";
        cpt++;
    }
});

function afficherNom() {
    const nomAnime = "Anime";
    if (nomAnime.includes(parametre.value)) {
        parametre.value = "";
        titre.textContent = nomAnime;
        afficherAnime();
    } else {
        titre.textContent = "Pas de resultat";
    }
}

function afficherID() {
    const IDAnime = "0052";
    if (IDAnime == parametre.value) {
        parametre.value = "";
        titre.textContent = IDAnime;
        afficherAnime();
    } else {
        titre.textContent = "Pas de resultat";
    }
}

function afficherClassement() {
    const ClassementAnime = "103";
    if (ClassementAnime == parametre.value) {
        parametre.value = "";
        titre.textContent = ClassementAnime;
        afficherAnime();
    } else {
        titre.textContent = "Pas de resultat";
    }
}

function afficherAnime() {}

setAPI();

getJSON();
