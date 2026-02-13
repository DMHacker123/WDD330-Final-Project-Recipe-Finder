const STORAGE_KEY = "favoriteRecipes";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}

export function addFavorite(id) {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorite(id) {
    const favorites = getFavorites().filter((favId) => favId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
