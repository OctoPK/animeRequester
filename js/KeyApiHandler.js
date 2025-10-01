let APIKey = null;
let APIHost = "anime-db.p.rapidapi.com";
const url = [
    "https://anime-db.p.rapidapi.com/anime?",
    "page=1",
    "&",
    "size=10",
    "&",
    "search=Fullmetal",
    "&",
    "genres=Fantasy%2CDrama",
    "&",
    "sortBy=ranking",
    "&",
    "sortOrder=asc",
    "&",
    "types=",
];

export function setAPI() {
    APIKey = prompt("Entrez votre clé API pour commencez : ");
}
