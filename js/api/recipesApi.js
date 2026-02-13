const BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = '05facc928abb4763ab63270922abd926';

export async function searchRecipes(query, diet = '') {
    const url = new URL(`${BASE_URL}/complexSearch`);
    url.searchParams.set('query', query);
    url.searchParams.set('number', 12);
    url.searchParams.set('apiKey', API_KEY);

    if (diet) {
        url.searchParams.set('diet', diet);
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.results;
}

export async function getRecipeDetails(id) {
    const url = new URL(`${BASE_URL}/${id}/information`);
    url.searchParams.set('apiKey', API_KEY);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
    }

    return response.json();
}
