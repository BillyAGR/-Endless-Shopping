
/**
 * This function calculates total price of a new order
 * @param {Array} products carProduct: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.price);
    return sum
}

/**
 * This function obtains the standard date.
 * @returns {date} standard date 
 */
export const dateFormatte = () => {

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return formattedDate;
}
