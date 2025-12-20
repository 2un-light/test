/**
 * math.js
 * 기본적인 사칙연산 함수를 제공하는 모듈입니다.
 */

/**
 * 입력값들이 유효한 숫자인지 검사합니다.
 * @param {string} operationName 연산 이름
 * @param {...number} values 검사할 숫자들
 */
function validateNumbers(operationName, ...values) {
    values.forEach((value) => {
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new TypeError(
                `[${operationName}] Invalid number: ${value}. Input must be a valid number.`
            );
        }
    });
}

/**
 * 두 숫자를 더합니다.
 */
export function add(a, b) {
    validateNumbers("add", a, b);
    return a + b;
}

/**
 * 두 숫자를 뺍니다. (a - b)
 */
export function subtract(a, b) {
    validateNumbers("subtract", a, b);
    return a - b;
}

/**
 * 두 숫자를 곱합니다.
 */
export function multiply(a, b) {
    validateNumbers("multiply", a, b);
    return a * b;
}

/**
 * 두 숫자를 나눕니다. (a / b)
 * b가 0일 경우 Infinity를 반환합니다.
 */
export function divide(a, b) {
    validateNumbers("divide", a, b);

    if (b === 0) {
        console.warn("[divide] ⚠️ Divide by zero detected. Returning Infinity.");
        return Infinity;
    }

    return a / b;
}
