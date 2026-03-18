/**
 * math.js
 * Provides basic arithmetic functions.
 */

/**
 * Validate that all arguments are valid numbers
 * @param {string} operationName
 * @param {...number} values
 */
function validateNumbers(operationName, ...values) {
    values.forEach((value) => {
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new TypeError(
                `[${operationName}] Invalid number: ${value}. Must be a valid number.`
            );
        }
    });
}

/**
 * Execute arithmetic operation safely
 * @param {string} operationName
 * @param {(a:number, b:number)=>number} operationFn
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function execute(operationName, operationFn, a, b) {
    validateNumbers(operationName, a, b);

    try {
        return operationFn(a, b);
    } catch (error) {
        console.error(`[${operationName}] Error:`, error);
        throw error;
    }
}

/**
 * Arithmetic operation definitions
 */
const operations = Object.freeze({
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0) {
            console.warn("⚠️ divide by zero detected. Returning Infinity.");
            return Infinity;
        }
        return a / b;
    },
});

/**
 * Public API
 */
export const add = (a, b) =>
    execute("add", operations.add, a, b);

export const subtract = (a, b) =>
    execute("subtract", operations.subtract, a, b);

export const multiply = (a, b) =>
    execute("multiply", operations.multiply, a, b);

export const divide = (a, b) =>
    execute("divide", operations.divide, a, b);
