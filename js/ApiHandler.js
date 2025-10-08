let APIKey = null;
let APIHost = "anime-db.p.rapidapi.com";
const url = [
    "https://anime-db.p.rapidapi.com/anime?",
    "page=1",
    "&",
    "size=10",
    "&",
    "search=",
    "&",
    "genres=",
    "&",
    "sortBy=ranking",
    "&",
    "sortOrder=asc",
    "&",
    "types=",
];
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": APIKey,
        "x-rapidapi-host": APIHost,
    },
};

export function setAPI() {
    APIKey = prompt("Entrez votre clé API pour commencez : ");
    options.headers["x-rapidapi-key"] = APIKey;
}

export async function getJSON() {
    try {
        let Surl = url.join("");
        const response = await fetch(Surl, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log("Erreur");
    }
}
