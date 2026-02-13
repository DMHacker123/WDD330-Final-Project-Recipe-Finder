const ACCESS_KEY = "RP-4WEyE2OAhKJHy1Laho6mn-Wm-a0eWj1jPpe-_xB0";
const BASE_URL = "https://api.unsplash.com/search/photos";

/**
 * Fetch a single image for a recipe
 */
export async function fetchRecipeImage(query) {
    try {
        const response = await fetch(
            `${BASE_URL}?query=${query}&per_page=1&client_id=${ACCESS_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch image");
        }

        const data = await response.json();
        return data.results[0]?.urls.small || "";
    } catch (error) {
        console.error("Image fetch error:", error);
        return "";
    }
}
