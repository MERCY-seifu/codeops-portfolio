"use strict";

const { createLoyalty, holidayRule } = require("./loyalty");

console.log("--- Standard card ---");

const card = createLoyalty();

card.earn(250);
console.log("After earning from 250 ETB:", card.balance()); 

card.redeem(10);
console.log("After redeeming 10 points:", card.balance()); 

card.redeem(100); 
console.log("After redeeming 100 points (should floor at 0):", card.balance()); 



console.log("\n--- Holiday card (double points) ---");

const holidayCard = createLoyalty(holidayRule);

holidayCard.earn(250); 
console.log("After earning from 250 ETB on holiday rule:", holidayCard.balance()); 

holidayCard.redeem(20);
console.log("After redeeming 20 points:", holidayCard.balance()); 


console.log("\n--- Privacy check ---");
console.log("Direct access to card.points:", card.points); 