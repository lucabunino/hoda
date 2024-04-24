
/**
 * Get the language from the event object
 * @param {object} event The event object
 * @returns {string} The language extracted from the event or a default value
 */
export function get_lang(event) {
    // Assuming the language is stored in the event object
    // Replace this with your actual logic to extract the language
    // For example, if the language is stored in a query parameter named 'lang'
    // you might do something like this:
    const lang = event.query?.lang || 'en'; // Default to 'en' if language is not provided
    return lang;
}