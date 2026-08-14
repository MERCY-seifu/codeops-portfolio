import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, correctAmount, netBalance } from "./report.js";

console.log("=== TeleBirr Transaction Report ===\n");

console.log("Receipts:");
formatReceipts(transactions).forEach((line) => console.log(" " + line));

console.log("\nTotals:");
console.log(`  Total credits: ${totalByType(transactions, "credit")} ETB`);
console.log(`  Total debits:  ${totalByType(transactions, "debit")} ETB`);
console.log(`  Net balance:   ${netBalance(transactions)} ETB`);

const corrected = correctAmount(transactions[2], 200);
console.log("\nCorrection example (spread, no mutation):");
console.log("  original:", transactions[2]);
console.log("  corrected:", corrected);
