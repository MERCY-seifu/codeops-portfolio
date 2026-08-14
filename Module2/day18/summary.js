import { total, withVat, format } from "./pricing.js";
import { orders } from "./orders.js";


const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: withVat(total(order.items)),
}));

const bigOrders = ordersWithTotals.filter((order) => order.total > 500);

const grandTotal = ordersWithTotals.reduce(
  (sum, order) => sum + order.total,
  0
);

console.log("=== Addis Market — Order Summary ===\n");

ordersWithTotals.forEach((order) => {
  console.log(`${order.id} — ${order.customer}: ${format(order.total)}`);
});

console.log("\n--- Orders over 500 ETB ---");
if (bigOrders.length === 0) {
  console.log("(none)");
} else {
  bigOrders.forEach((order) => {
    console.log(`${order.id} — ${order.customer}: ${format(order.total)}`);
  });
}

console.log(`\nGrand total: ${format(grandTotal)}`);