const API_KEY = "YOUR_SPOONACULAR_API_KEY";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export async function searchRecipes(query) {
    try {
        const response = await fetch(
            `${BASE_URL}?query=${query}&number=10&apiKey=${API_KEY}`
        );

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Spoonacular API error:", error);
        return [];
    }
}
