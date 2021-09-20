import { readFileSync } from 'fs'
import { lexer } from "./lexer.js"

import { parser } from "./parser.js"

const fileName = "./source.js"

const input = String(readFileSync(fileName));

// const input ="678 \n 567 + 8"



console.log(" Lexer Start");
for (const token of lexer(input)) {
    console.log(token);
}

// console.log(JSON.stringify([...lexer(input)]));
console.log("Lexer Finished");


console.log("Parser Started")
const ast = parser(fileName,lexer(input))

console.dir(ast,{depth: null})
console.log("Parser Finished")