"use strict";

const subtotal = (...prices) => {
  return prices.reduce((sum, price) => sum + price, 0);
};

const discountBy = (rate) => {
  return (amount) => amount * (1 - rate);
};

const withVat = (n) => {
  return n * 1.15;
};

const toETB = (n) => {
  return `${n.toFixed(2)} ETB`;
};

function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy(0.1);

  return function (...items) {
    orderNo += 1;
    const total = subtotal(...items);
    const discounted = memberOff(total);
    const finalAmount = withVat(discounted);
    return `#${orderNo}: ${toETB(finalAmount)}`;
  };
}

if (typeof module !== "undefined") {
  module.exports = { subtotal, discountBy, withVat, toETB, makeReceiptMaker };
}
