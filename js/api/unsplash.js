const ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";
const BASE_URL = "https://api.unsplash.com/search/photos";

export async function fetchImage(query) {
    try {
        const response = await fetch(
            `${BASE_URL}?query=${query}&per_page=1&client_id=${ACCESS_KEY}`
        );

        const data = await response.json();
        return data.results[0]?.urls.small || "";
    } catch (error) {
        console.error("Unsplash API error:", error);
        return "";
    }
}
