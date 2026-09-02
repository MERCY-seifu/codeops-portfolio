'use strict';
// rest params: any number of prices
const subtotal = (...prices) =>
prices.reduce((sum, p) => sum + p, 0);
// factory (HOF + closure)
const discountBy = rate =>
n => n * (1 - rate);
// small pure helpers
const withVat = n => n * 1.15;
const toETB = n => `${n.toFixed(2)} ETB`


// closure keeps a running order number
function makeReceiptMaker() {
    let orderNo = 0;
    const memberOff = discountBy(0.10);
    return function (...items) {
    orderNo++;
const gross = subtotal(...items);
const net = withVat(memberOff(gross));
    return `#${orderNo}: ${toETB(net)}`;
    };
}
const receipt = makeReceiptMaker();


// Almaz orders Doro Wat + Tibs + Shiro
receipt(220, 180, 120);
// "#1: 538.20 ETB"
// Dawit orders Firfir + Buna
receipt(140, 60);
// "#2: 207.00 ETB"