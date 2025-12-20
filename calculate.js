/**
 * math.js
 * 기본적인 사칙연산 함수를 제공하는 모듈입니다.
 */

// 입력값이 유효한 숫자인지 확인하고, 아니면 TypeError를 발생시키는 헬퍼 함수
function safeNumber(v, operationName) {
    if (typeof v !== "number" || Number.isNaN(v)) {
        throw new TypeError(`[${operationName}] Invalid number: ${v}. Input must be a valid number.`);
    }
    return v;
}

/**
 * 두 숫자를 더합니다.
 * @param {number} a 첫 번째 숫자
 * @param {number} b 두 번째 숫자
 * @returns {number} 합계
 */
export function add(a, b) {
    safeNumber(a, 'add');
    safeNumber(b, 'add');
    return a + b;
}

/**
 * 두 숫자를 뺍니다. (a - b)
 * @param {number} a 첫 번째 숫자
 * @param {number} b 두 번째 숫자
 * @returns {number} 차이
 */
export function subtract(a, b) {
    safeNumber(a, 'subtract');
    safeNumber(b, 'subtract');
    return a - b;
}

/**
 * 두 숫자를 곱합니다.
 * @param {number} a 첫 번째 숫자
 * @param {number} b 두 번째 숫자
 * @returns {number} 곱
 */
export function multiply(a, b) {
    safeNumber(a, 'multiply');
    safeNumber(b, 'multiply');
    return a * b;
}

/**
 * 두 숫자를 나눕니다. (a / b)
 * b가 0일 경우 Infinity를 반환합니다.
 * @param {number} a 분자
 * @param {number} b 분모
 * @returns {number} 몫
 */
export function divide(a, b) {
    safeNumber(a, 'divide');
    safeNumber(b, 'divide');
    
    if (b === 0) {
        console.warn("⚠️ divide by zero detected. Returning Infinity.");
        return Infinity;
    }
    
    return a / b;
}