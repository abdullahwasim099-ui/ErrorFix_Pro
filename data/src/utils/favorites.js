const FAVORITES_KEY = 'errorfix_favorites';

/**
 * Retrieves the list of favorite error codes from localStorage.
 * @returns {string[]} Array of error codes
 */
export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return [];
  }
};

/**
 * Adds an error code to the favorites list in localStorage.
 * @param {string} errorCode - The error code to add (e.g., '0x0000007B')
 * @returns {string[]} The updated array of favorites
 */
export const addFavorite = (errorCode) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(errorCode)) {
      const updatedFavorites = [...favorites, errorCode];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    return favorites;
  } catch (error) {
    console.error('Failed to save favorite to localStorage:', error);
    return getFavorites();
  }
};

/**
 * Removes an error code from the favorites list in localStorage.
 * @param {string} errorCode - The error code to remove
 * @returns {string[]} The updated array of favorites
 */
export const removeFavorite = (errorCode) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((code) => code !== errorCode);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Failed to remove favorite from localStorage:', error);
    return getFavorites();
  }
};

/**
 * Toggles the favorite status of an error code.
 * @param {string} errorCode - The error code to toggle
 * @returns {string[]} The updated array of favorites
 */
export const toggleFavorite = (errorCode) => {
  const favorites = getFavorites();
  if (favorites.includes(errorCode)) {
    return removeFavorite(errorCode);
  } else {
    return addFavorite(errorCode);
  }
};
