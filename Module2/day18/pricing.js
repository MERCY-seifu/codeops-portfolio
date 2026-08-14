const VAT_RATE = 0.15; 
 
export function total(items) {
  return items.reduce((sum, { price, qty }) => sum + price * qty, 0);
}

export function withVat(amount) {
  return amount * (1 + VAT_RATE);
}


export function format(amount) {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ETB`;
}