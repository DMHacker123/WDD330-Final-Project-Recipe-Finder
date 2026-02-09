import { fetchImage } from "../api/unsplash.js";

export function createRecipeCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card fade-in";

    const img = document.createElement("img");
    img.alt = `Image of ${recipe.title}`;

    fetchImage(recipe.title).then((url) => {
        img.src = url;
    });

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    card.append(img, title);
    return card;
}
