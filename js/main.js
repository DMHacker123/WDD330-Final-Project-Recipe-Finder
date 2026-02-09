import { searchRecipes } from "./api/spoonacular.js";
import { createRecipeCard } from "./components/RecipeCard.js";
import { clearElement } from "./utils/dom.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearElement(results);

    const query = input.value.trim();
    if (!query) return;

    const recipes = await searchRecipes(query);

    recipes.forEach((recipe) => {
        const card = createRecipeCard(recipe);
        results.appendChild(card);
    });
});
