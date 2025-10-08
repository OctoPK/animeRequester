import { setAPI } from "./js/KeyApiHandler.js";

const resultDisplay = document.getElementById("result");
const effacerBtn = document.getElementById("effacer");
const parametre = document.getElementById("parametre");
const rechercheType = document.getElementById("recherche");
const submitBtn = document.getElementById("submit");
const titre = document.getElementById("titre");
const sombre = document.getElementById("sombre");

let cpt = 0;

let JSON;
let JSONTrie;

function afficheAnime (){

	JSONTrie = JSON;

	for (i = 0; i < JSONTrie.length; i++){
		let nom = document.createElement("h2");
		let synopsis = document.createElement("p");
		let genre = document.createElement("p");
		let classement = document.createElement("p");
		let nb_episodes = document.createElement("p");

		nom.textContent = JSONTrie["nom"];
		synopsis.textContent = JSONTrie["synopsis"];
		genre.textContent = JSONTrie["genre"];
		classement.textContent = JSONTrie["classement"];
		nb_episodes.textContent = JSONTrie["nb_episodes"];

	}
}


effacerBtn.addEventListener("click", (event) => {
	event.preventDefault();
    parametre.value = "";
});

submitBtn.addEventListener("click", () => {
	alert("Recherche en cours...");
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



setAPI();

/*const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '10a54a5fa3msh0fc12837cdd81d7p1fd387jsn601f20cc9dbc',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	resultDisplay.textContent = result;
} catch (error) {
	resultDisplay.textContent = 'Erreur';
}*/
