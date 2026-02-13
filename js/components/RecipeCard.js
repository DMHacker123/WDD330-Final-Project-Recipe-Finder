import { fetchRecipeImage } from "../api/imagesApi.js";
import { openRecipeModal } from "./RecipeModal.js";
import {
    addFavorite,
    removeFavorite,
    isFavorite,
} from "../utils/favorites.js";

export function createRecipeCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card fade-in";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.alt = `${recipe.title} recipe image`;


    fetchRecipeImage(recipe.title).then((url) => {
        img.src = url || "assets/placeholder.png";
    });

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    const favButton = document.createElement("button");
    favButton.className = "favorite-btn";
    favButton.setAttribute("aria-label", "Toggle favorite");
    favButton.textContent = isFavorite(recipe.id) ? "❤️" : "🤍";

    favButton.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isFavorite(recipe.id)) {
            removeFavorite(recipe.id);
            favButton.textContent = "🤍";
        } else {
            addFavorite(recipe.id);
            favButton.textContent = "❤️";
        }
    });

    card.addEventListener("click", () => {
        openRecipeModal(recipe.id);
    });

    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            openRecipeModal(recipe.id);
        }
    });

    card.append(img, favButton, title);
    return card;
}
