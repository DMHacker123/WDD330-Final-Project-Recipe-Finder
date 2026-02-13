import { getFavorites } from "./utils/favorites.js";
import { getRecipeDetails } from "./api/recipesApi.js";

import { searchRecipes } from "./api/recipesApi.js";
import { createRecipeCard } from "./components/RecipeCard.js";
import { clearElement } from "./utils/dom.js";


const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const loader = document.getElementById("loader");

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

const dietFilter = document.getElementById("diet-filter");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearElement(results);

    const query = input.value.trim();
    const diet = dietFilter.value;

    if (!query) return;

    showLoader();

    try {
        const recipes = await searchRecipes(query, diet);

        if (recipes.length === 0) {
            results.textContent = "No recipes found.";
            return;
        }

        recipes.forEach((recipe) => {
            results.appendChild(createRecipeCard(recipe));
        });
    } catch {
        results.textContent = "Something went wrong. Try again.";
    } finally {
        hideLoader();
    }
});

async function renderFavorites() {
    clearElement(results);

    const favoriteIds = getFavorites();

    if (favoriteIds.length === 0) {
        results.textContent = "No favorite recipes yet.";
        return;
    }

    showLoader();

    try {
        for (const id of favoriteIds) {
            const recipe = await getRecipeDetails(id);
            results.appendChild(createRecipeCard(recipe));
        }
    } catch {
        results.textContent = "Failed to load favorites.";
    } finally {
        hideLoader();
    }
}

document
    .getElementById("favorites-link")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderFavorites();
    });


