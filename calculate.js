/**
 * Simple, safe Calculator factory
 * - 입력값 검사 (숫자 여부)
 * - 로그 온/오프 옵션
 * - 연산 이력 저장 (getHistory / clearHistory)
 * - 체이닝 API 지원 (chain)
 */
function createCalculator({ enableLog = true } = {}) {
  const history = [];

  const safeNumber = (v) => {
    if (typeof v !== "number" || Number.isNaN(v)) {
      throw new TypeError(`Invalid number: ${v}`);
    }
    return v;
  };

  const log = (message) => {
    if (enableLog) console.log(message);
  };

  const record = (op, a, b, result) => {
    const entry = { op, a, b, result, time: new Date().toISOString() };
    history.push(entry);
    log(`📌 [${entry.time}] ${a} ${op} ${b} = ${result}`);
    return result;
  };

  const operations = {
    add: (a, b) => record("+", safeNumber(a), safeNumber(b), a + b),
    subtract: (a, b) => record("-", safeNumber(a), safeNumber(b), a - b),
    multiply: (a, b) => record("*", safeNumber(a), safeNumber(b), a * b),
    divide: (a, b) => {
      safeNumber(a);
      safeNumber(b);
      let result;
      if (b === 0) {
        result = Infinity;
        if (enableLog) console.warn("⚠️ divide by zero → Infinity");
      } else {
        result = a / b;
      }
      return record("/", a, b, result);
    },
  };

  // 체이닝 지원
  const chain = (start = 0) => {
    let acc = safeNumber(start);
    const chainObj = {};
    for (const [name, fn] of Object.entries(operations)) {
      chainObj[name] = (v) => { acc = fn(acc, v); return chainObj; };
    }
    chainObj.value = () => acc;
    return chainObj;
  };

  return {
    ...operations,
    getHistory: () => [...history],
    clearHistory: () => { history.length = 0; },
    enableLogging: () => { enableLog = true; },
    disableLogging: () => { enableLog = false; },
    chain,
  };
}

/* =========================
   사용 예시
   ========================= */
const calc = createCalculator({ enableLog: true });

calc.add(3, 2);
calc.subtract(10, 4);
calc.multiply(5, 3);
calc.divide(12, 3);
calc.divide(9, 0);

const result = calc.chain(2).add(3).multiply(4).divide(2).value();
console.log("chain result:", result);

console.log("history:", calc.getHistory());

calc.disableLogging();
calc.add(1, 1);
