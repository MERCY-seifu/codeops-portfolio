const state = {
  base: "ETB",
  rates: {},       // ETB -> other currency, e.g. rates.USD = units of USD per 1 ETB
  amount: 100,
  currency: "USD",
};

const api = "https://open.er-api.com/v6/latest/ETB";

function setState(newState) {
  Object.assign(state, newState);
  render();
}

async function getRates() {
  try {
    const response = await fetch(api);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setState({ rates: data.rates });
  } catch (error) {
    console.error(error);
  }
}

// state.rates[currency] = units of `currency` per 1 ETB (e.g. USD: 0.018)
// So: amount of ETB -> other currency = amount * rate
function convertFromETB(amountETB, currency) {
  const rate = state.rates[currency];
  if (!rate) return null;
  return amountETB * rate;
}

// Build the DOM ONCE — this is the key fix
function initDOM() {
  document.getElementById("app").innerHTML = `
    <div>
      <input id="amount" type="number" value="${state.amount}" />
      <select id="currency"></select>
      <p id="result">Loading rates...</p>
    </div>
  `;

  document.getElementById("amount").addEventListener("input", (e) => {
    setState({ amount: Number(e.target.value) });
  });

  document.getElementById("currency").addEventListener("change", (e) => {
    setState({ currency: e.target.value });
  });
}

// Only touch the parts that changed — never rebuilds the input
function render() {
  const select = document.getElementById("currency");
  const resultEl = document.getElementById("result");

  const currentOptions = Array.from(select.options).map((o) => o.value);
  const neededOptions = Object.keys(state.rates);
  if (currentOptions.join(",") !== neededOptions.join(",") && neededOptions.length) {
    select.innerHTML = neededOptions
      .map((c) => `<option value="${c}" ${c === state.currency ? "selected" : ""}>${c}</option>`)
      .join("");
  }
  if (neededOptions.length) select.value = state.currency;

  const result = convertFromETB(state.amount, state.currency);
  resultEl.textContent =
    result !== null
      ? `${state.amount} ETB = ${result.toFixed(4)} ${state.currency}`
      : "Loading rates...";
}

initDOM();   // build DOM & attach listeners once
render();    // initial paint
getRates();  // fetch, then re-render with real data