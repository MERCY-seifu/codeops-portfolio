const prices = [320, 850, 1200, 640, 990, 75];
const VAT_RATE = 0.15;

const pricesWithVat = prices.map((price) => price * (1 + VAT_RATE));

const underThousand = pricesWithVat.filter((price) => price < 1000);

const grandTotal = underThousand.reduce((sum, price) => sum + price, 0);

console.log("Original prices:", prices);
console.log("Prices with VAT:", pricesWithVat);
console.log("Under 1000 (with VAT):", underThousand);
console.log("Grand total:", grandTotal.toFixed(2), "ETB");



const customer = {
  name: "Selam Tesfaye",
  city: "Addis Ababa",
  balance: 1250.5,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}



const customer = {
  name: "Dawit Alemu",
  city: "Bahir Dar",
  balance: 875,
};


const { name, city } = customer;
console.log(`${name} is from ${city}`);

function greet({ name }) {
  return `Welcome, ${name}!`;
}

console.log(greet(customer));



const customer = {
  name: "Hanna Girma",
  city: "Addis Ababa",
  balance: 430,
};

const updatedCustomer = {
  ...customer,
  city: "Hawassa",
  phone: "+251 91 234 5678",
};

console.log("Original customer:", customer);
console.log("Updated customer:", updatedCustomer);
console.log("Original was mutated?", customer.city === "Hawassa"); 



export const VAT = 0.15;

export function addVat(amount) {
  return amount * (1 + VAT);
}



import { addVat, VAT } from "./money.js";

const price = 500;
const priceWithVat = addVat(price);

console.log(`VAT rate: ${VAT * 100}%`);
console.log(`Price: ${price} ETB`);
console.log(`Price with VAT: ${priceWithVat.toFixed(2)} ETB`);
