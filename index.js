
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  output.innerHTML = removeComments(input.value);
  hljs.highlightBlock(output);
});

function removeComments(code) {
  // Проходимся циклом по всем символам кода
  for (let index = 0; code[index]; index++) {
    const char = code[index];

    // Если текущий символ - начало объявления строки, - находим конец строки
    // и продолжаем цикл с него
    if (char === "`" || char === "'" || char === '"') {
      nextIndex = code.indexOf(char, index + 1);

      while (code[nextIndex - 1] === "\\") {
        nextIndex = code.indexOf(char, nextIndex + 1);
      }

      index = nextIndex;
    }

    // Если текущий символ - начало комментария, - выбрасываем комментарий из кода
    if (char === "/" && code[index + 1] === "/") {
      code = code.slice(0, index) + code.slice(code.indexOf("\n", index) + 1);
    }

    if (char === "/" && code[index + 1] === "*") {
      code =
        code.slice(0, index) + code.slice(code.indexOf("*/", index + 1) + 2);
    }
  }

  return code;
}
