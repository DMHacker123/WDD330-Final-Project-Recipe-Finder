import { getRecipeDetails } from "../api/recipesApi.js";

export async function openRecipeModal(recipeId) {
  const modalRoot = document.getElementById("modal-root");
  modalRoot.innerHTML = `<div class="modal-backdrop">Loading…</div>`;

  try {
    const recipe = await getRecipeDetails(recipeId);

    const ingredientsList = recipe.extendedIngredients
      .map((ing) => `<li>${ing.original}</li>`)
      .join("");

    const instructions =
      recipe.instructions || "No instructions available.";

    const calories =
      recipe.nutrition?.nutrients.find((n) => n.name === "Calories")
        ?.amount || "N/A";

    modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" tabindex="-1">

          <button class="close-modal" aria-label="Close modal">×</button>

          <h2>${recipe.title}</h2>

          <h3>Ingredients</h3>
          <ul>${ingredientsList}</ul>

          <h3>Instructions</h3>
          <p>${instructions}</p>

          <h3>Nutrition</h3>
          <p><strong>Calories:</strong> ${calories}</p>
        </div>
      </div>
    `;

    document
      .querySelector(".close-modal")
      .addEventListener("click", closeModal);
  } catch {
    modalRoot.innerHTML = "";
  }
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}
