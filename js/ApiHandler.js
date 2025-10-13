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

/**
 *
 * @returns -1 si erreur sinon le resultat en JSON de la requête
 */
export async function getJSON() {
    try {
        let Surl = url.join("");
        const response = await fetch(Surl, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Erreur");
        return -1;
    }
}

/**
 * Cette fonction est a appelé le nombre de fois qu'on modifie un paramètre de l'url.
 * ex :
 * On veut rechercher par genre et titre, on doit appelé la fonction une fois pour la recherche par titre et une autre fois pour la recherche par genre.
 *
 * Les types peuvents être (name, size, genres, sortBy, sortOrder, types, ranking, id). Lorsqu'un mauvais type est rentré, une alert est lancé par la fonction.
 * Les types sont sensibles à la case donc les écrire exactement de la façon que j'ai dite plus haut.
 *
 * Le sortBy est soit ranking ou title.
 *
 * Le sortOrder est soit asc ou desc.
 *
 * La size, c'est le nombre d'anime qu'on veut récupéré.
 *
 * Le name fonctionne pour les titres mais également pour les titres alternatives des animés. La recherches ignores le tri.
 *
 * Le ranking, c'est pour recherché un animé par rapport à son classement.
 *
 * Le id recherche un animé par rapport à son id.
 *
 * Les différents genres sont :
 * - Award Winning
 * - Action
 * - Suspense
 * - Horror
 * - Ecchi
 * - Avant Garde
 * - Sports
 * - Supernatural
 * - Fantasy
 * - Gourmet
 * - Boys Love
 * - Drama
 * - Comedy
 * - Mystery
 * - Girls Love
 * - Slice of Life
 * - Adventure
 * - Romance
 * - Sci-Fi
 * - Erotica
 * - Hentai
 * Pour les genres, ils sont sensible à la case donc écrivez comme ce qui est au dessus et quand il y a plusieur
 * genre les séparées par "2%C" et ne pas mettre d'espaces entre les différents genre.
 * @param {string} type - le type de recherche qu'on veut faire
 * @param {string} param - la valeur à mettre dans l'url
 */
export function changerURL(type, param) {
    switch (type) {
        case "size":
            url[3] = "size=" + param;
            break;
        case "name":
            url[5] += param;
            break;
        case "genres":
            url[7] += param;
            break;
        case "sortBy":
            url[9] = "sortBy=" + param;
            break;
        case "sortOrder":
            url[11] = "sortOrder=" + param;
            break;
        case "types":
            url[13] += param;
        case "ranking":
            for (let i = 1; i < url.length; i++) {
                url[i] = "";
            }
            url[0] = url[0].substring(0, url[0].length - 1) + "/by-ranking/" + param;
            break;
        case "id":
            for (let i = 1; i < url.length; i++) {
                url[i] = "";
            }
            url[0] = url[0].substring(0, url[0].length - 1) + "/by-id/" + param;
            break;
        default:
            alert("champ url introuvable");
            break;
    }
}

export function resetURL() {
    url = [
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
}
