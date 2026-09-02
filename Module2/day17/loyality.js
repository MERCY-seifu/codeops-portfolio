"use strict";

const standardRule = (etb) => Math.floor(etb / 10);


const holidayRule = (etb) => Math.floor(etb / 10) * 2;


const calculateEarn = (currentPoints, etb, earnRule) =>
  currentPoints + earnRule(etb);

const calculateRedeem = (currentPoints, pointsToRedeem) =>
  Math.max(0, currentPoints - pointsToRedeem);

function createLoyalty(earnRule = standardRule) {
  let points = 0; 
  
  return {
    earn(etb) {
      points = calculateEarn(points, etb, earnRule);
    },
    redeem(p) {
      points = calculateRedeem(points, p);
    },
    balance() {
      return points;
    },
  };
}

if (typeof module !== "undefined") {
  module.exports = { createLoyalty, standardRule, holidayRule, calculateEarn, calculateRedeem };
}