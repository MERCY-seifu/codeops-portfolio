"use strict";

function vat(amount, rate = 0.15) {
  return amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("--- 1. vat ---");
console.log(vat(1000));           
console.log(vat(1000, 0.2));      
console.log(vatArrow(1000));      
console.log(vatArrow(1000, 0.2)); 



function makeCounter() {
  let count = 0; 

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();

console.log("--- 2. makeCounter ---");
console.log(counter()); 
console.log(counter());
console.log(counter()); 

const discountBy = (rate) => (amount) => amount * (1 - rate);

const memberPrice = discountBy(0.10); 
const salePrice = discountBy(0.30);   

console.log("--- 3. discountBy ---");
console.log(memberPrice(1000)); 
console.log(salePrice(1000));   



const applyToAll = (list, fn) => list.map(fn);

const prices = [100, 250, 400];
const pricesWithVat = applyToAll(prices, (price) => price + vat(price));

console.log("--- 4. applyToAll ---");
console.log(pricesWithVat); 



const cities = ["Addis Ababa", "Bahir Dar", "Gondar", "Hawassa", "Mekelle"];

console.log("--- 5. forEach cities ---");
cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});