const ipt1 = document.getElementById("ipt1");
const ipt2 = document.getElementById("ipt2");
const ipt3 = document.getElementById("ipt3");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
let cs = "";

btn1.onclick = () => {
  cs = ipt1.value;

  function integerToRoman(num) {
    num = cs;
    const symbols = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" },
    ];

    let romanNumeral = "";

    for (const { value, symbol } of symbols) {
      while (num >= value) {
        romanNumeral += symbol;
        num -= value;
      }
    }
    return romanNumeral;
  }

  result1.style.display = "block";
  result1.textContent = `El número ${cs} se escribe en romano: ${integerToRoman(
    cs
  )}`;

  ipt1.value = "";
};

btn2.onclick = () => {
  cs = ipt2.value;
  function romanToInteger(romanNumeral) {
    romanNumeral = cs.toUpperCase();
    const symbols = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;

    for (let i = 0; i < romanNumeral.length; i++) {
      const currentSymbol = symbols[romanNumeral[i]];
      const nextSymbol = symbols[romanNumeral[i + 1]];

      if (nextSymbol && currentSymbol < nextSymbol) {
        result += nextSymbol - currentSymbol;
        i++;
      } else {
        result += currentSymbol;
      }
    }

    return result;
  }

  result2.style.display = "block";
  result2.textContent = `El ${cs} equivale a: ${romanToInteger(cs)}`;

  ipt2.value = "";
};

btn3.onclick = () => {
    cs = ipt3.value;
  function expandedForm(num) {
    num = cs;
    return String(num)
      .split("")
      .map((num, index, arr) => num + "0".repeat(arr.length - index - 1))
      .filter((num) => Number(num) != 0)
      .join(" + ");
  }

  result3.style.display = "block";
  result3.textContent = `${cs} equivale a: ${expandedForm(cs)}`;

  ipt3.value = "";
};