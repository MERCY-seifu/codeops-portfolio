export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const formatReceipts = (txns) =>
  txns.map(({ id, customer, amount, type }) => {
    const sign = type === "credit" ? "+" : "-";
    return `#${id} ${customer.padEnd(10)} ${sign}${amount} ETB (${type})`;
  });

export const correctAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});

export const netBalance = (txns) =>
  totalByType(txns, "credit") - totalByType(txns, "debit");
