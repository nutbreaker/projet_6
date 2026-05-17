/**
 * Formats a height value from centimeters to meters.
 * 
 * @param {number} height the height in centimeters
 * 
 * @returns {string} the formatted height string ("1.80m")
 */
export function formatHeight(height) {
    return (height / 100).toFixed(2) + 'm';
}

/**
 * Formats a weight value by appending "kg".
 * 
 * @param {number|string} weight the weight value
 * 
 * @returns {string} the formatted weight string ("80kg")
 */
export function formatWeight(weight) {
    return `${weight}kg`;
}

/**
 * Translates a gender string from English to French.
 * 
 * @param {string} gender the gender string ("female" or "male")
 * 
 * @returns {string} the translated gender string ("Femme", "Homme" or "Inconnu")
 */
export function formatGender(gender) {
    if (gender === 'female') {
        return 'Femme';
    }

    if (gender === 'male') {
        return 'Homme';
    }

    return 'Inconnu';
}

/**
 * Formats a date string into a localized French date string.
 * 
 * @param {string|Date} dateStr the date to format
 * 
 * @returns {string} the formatted date string ("1 janvier 2023")
 */
export function dateFormat(dateStr) {
    const date = new Date(dateStr);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

/**
 * Calculates the start and end dates of the week for a given date.
 * 
 * @param {string|Date} date the reference date
 * 
 * @returns {{start: string, end: string, displayStart: string, displayEnd: string}} the week range data
 */
export function getWeekRange(date) {
    const referenceDate = new Date(date);
    const day = referenceDate.getDay();

    const diffToMonday = referenceDate.getDate() - day + (day === 0 ? -6 : 1);

    const monday = new Date(referenceDate.setDate(diffToMonday));
    const sunday = new Date(referenceDate.setDate(monday.getDate() + 6));

    const formatDisplay = (d) => d.toLocaleDateString('fr-FR'); // DD/MM/YYYY

    return {
        start: extractISOYYYYMMDDFromDate(monday),
        end: extractISOYYYYMMDDFromDate(sunday),
        displayStart: formatDisplay(monday),
        displayEnd: formatDisplay(sunday)
    };
};

/**
 * Extracts the YYYY-MM-DD part from a given date.
 * 
 * @param {Date|string} date the reference date
 * 
 * @returns {string} the ISO formatted date string
 */
export function extractISOYYYYMMDDFromDate(date) {
    const referenceDate = new Date(date);

    return referenceDate.toISOString().split('T')[0];
}

/**
 * Formats the week range for a given date into a readable string.
 * 
 * @param {string|Date} date the reference date
 * 
 * @returns {string} the formatted week range ("01 janvier - 07 janvier")
 */
export function formatWeekRange(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.getFullYear(), d.getMonth(), diff);
    const sunday = new Date(d.getFullYear(), d.getMonth(), diff + 6);

    const options = { day: '2-digit', month: 'long' };
    return `${monday.toLocaleDateString('fr-FR', options)} - ${sunday.toLocaleDateString('fr-FR', options)}`;
};

/**
 * Formats a total duration in minutes into hours and minutes.
 * 
 * @param {number} totalDuration the total duration in minutes
 * 
 * @returns {{hours: string, minutes: string}} the formatted time object
 */
export function formatTime(totalDuration) {
    let hours = Math.floor(totalDuration / 60);
    let minutes = totalDuration % 60;

    return {
        hours: hours.toString(),
        minutes: minutes < 10 ? '0' + minutes : minutes.toString()
    };
}