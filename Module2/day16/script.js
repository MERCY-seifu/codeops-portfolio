'use strict';

const billRaw = "350"; // from input
const bill = Number(billRaw); // → number
const partySize = 3;

let tip;
if (bill > 300) {
    tip = bill * 0.10;
} else {
    tip = bill * 0.05;
}

const total = bill + tip;
const perPerson = total / partySize;

console.log(
    `Total ${total} ETB, ` +
    `${perPerson} ETB each`
);



