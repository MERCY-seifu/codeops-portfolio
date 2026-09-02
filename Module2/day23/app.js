const state = {
  dishes: [],
  cart: [],
  search: "",
  category: "all"
};


const menuEl = document.querySelector("#menu");
const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");
const filtersEl = document.querySelector("#filters");
const checkoutBtn = document.querySelector("#checkout-btn");
const overlayEl = document.querySelector("#overlay");
const modalContentEl = document.querySelector("#modal-content");

async function loadMenu() {
  menuEl.innerHTML = `<p class="empty-cart">Loading traditional menu...</p>`;
  try {
    const response = await fetch("data/menu.json");
    if (!response.ok) throw new Error("HTTP error! Status: " + response.status);
    
    state.dishes = await response.json();
    render();
  } catch (err) {
    state.dishes = [
      { "id": 1, "name": "Doro Wat", "category": "Main", "price": 240, "spicy": true },
      { "id": 2, "name": "Shiro", "category": "Vegetarian", "price": 120, "spicy": false },
      { "id": 3, "name": "Kitfo", "category": "Main", "price": 320, "spicy": true },
      { "id": 4, "name": "Tibs", "category": "Main", "price": 280, "spicy": true },
      { "id": 5, "name": "Injera Firfir", "category": "Breakfast", "price": 100, "spicy": true },
      { "id": 6, "name": "Beyaynetu", "category": "Vegetarian", "price": 150, "spicy": false },
      { "id": 7, "name": "Misir Wat", "category": "Vegetarian", "price": 110, "spicy": true },
      { "id": 8, "name": "Gomen", "category": "Vegetarian", "price": 90, "spicy": false },
      { "id": 9, "name": "Atkilt Wot", "category": "Vegetarian", "price": 100, "spicy": false },
      { "id": 10, "name": "Derek Tibs", "category": "Main", "price": 310, "spicy": true },
      { "id": 11, "name": "Key Wat", "category": "Main", "price": 220, "spicy": true },
      { "id": 12, "name": "Alicha Wat", "category": "Main", "price": 210, "spicy": false },
      { "id": 13, "name": "Bozena Shiro", "category": "Main", "price": 180, "spicy": true },
      { "id": 14, "name": "Ayibe", "category": "Side", "price": 70, "spicy": false },
      { "id": 15, "name": "Kocho", "category": "Side", "price": 60, "spicy": false },
      { "id": 16, "name": "Enkulal Firfir", "category": "Breakfast", "price": 110, "spicy": true },
      { "id": 17, "name": "Fuul", "category": "Breakfast", "price": 90, "spicy": true },
      { "id": 18, "name": "Genfo", "category": "Breakfast", "price": 130, "spicy": true },
      { "id": 19, "name": "Chechebsa", "category": "Breakfast", "price": 120, "spicy": true },
      { "id": 20, "name": "Kik Alicha", "category": "Vegetarian", "price": 100, "spicy": false }
    ];
    render();
  }
}


function render() {
  renderFilters();
  renderMenu();
  renderCart();
}

function renderMenu() {
  const term = state.search.toLowerCase();
  const shown = state.dishes.filter(d => {
    const matchesTerm = d.name.toLowerCase().includes(term);
    const matchesCat = state.category === "all" || d.category.toLowerCase() === state.category;
    return matchesTerm && matchesCat;
  });

  if (shown.length === 0) {
    menuEl.innerHTML = `<p class="no-results">No traditional dishes found matching "${state.search}"</p>`;
    return;
  }

  menuEl.innerHTML = shown.map(d => `
    <article class="dish" data-id="${d.id}">
      <div>
        <div class="dish-header">
          <h3>${d.name}</h3>
          <span class="badge ${d.category.toLowerCase()}">${d.category}</span>
        </div>
        <p class="spicy-tag">${d.spicy ? "🌶️ Spicy" : "🌱 Mild / Non-spicy"}</p>
      </div>
      <div class="dish-footer">
        <span class="price">${d.price} ETB</span>
        <button class="add">Add to Cart</button>
      </div>
    </article>
  `).join("");
}


function renderFilters() {
  const cats = ["all", ...new Set(state.dishes.map(d => d.category))];
  filtersEl.innerHTML = cats.map(c => {
    const key = c === "all" ? "all" : c.toLowerCase();
    const label = c === "all" ? "All" : c;
    return `<button class="filter-btn ${state.category === key ? "active" : ""}" data-cat="${key}">${label}</button>`;
  }).join("");
}

function renderCart() {
  checkoutBtn.disabled = state.cart.length === 0;

  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    cartTotalEl.textContent = `0 ETB`;
    return;
  }

  cartItemsEl.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-details">
        <span class="cart-item-title">${item.name}</span>
        <span class="cart-item-price">${item.price} ETB x ${item.qty}</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn decrease">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn increase">+</button>
        <button class="rm">Remove</button>
      </div>
    </div>
  `).join("");


  const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotalEl.textContent = `${total} ETB`;
}


searchEl.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderMenu();
});


filtersEl.addEventListener("click", (e) => {
  if (!e.target.matches(".filter-btn")) return;
  state.category = e.target.dataset.cat;
  renderMenu();
  renderFilters();
});


menuEl.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;
  
  const card = e.target.closest(".dish");
  const id = Number(card.dataset.id);
  const dish = state.dishes.find(d => d.id === id);
  
  const existingLine = state.cart.find(i => i.id === id);
  if (existingLine) {
    existingLine.qty++;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }

  saveCart();
  renderCart();
});


cartItemsEl.addEventListener("click", (e) => {
  const cartItemEl = e.target.closest(".cart-item");
  if (!cartItemEl) return;
  const id = Number(cartItemEl.dataset.id);

  if (e.target.matches(".rm")) {
    state.cart = state.cart.filter(i => i.id !== id);
  } else if (e.target.matches(".increase")) {
    const item = state.cart.find(i => i.id === id);
    if (item) item.qty++;
  } else if (e.target.matches(".decrease")) {
    const item = state.cart.find(i => i.id === id);
    if (item) {
      item.qty--;
      if (item.qty <= 0) {
        state.cart = state.cart.filter(i => i.id !== id);
      }
    }
  }

  saveCart();
  renderCart();
});


function saveCart() {
  localStorage.setItem("addiseats_cart", JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem("addiseats_cart");
  if (saved) {
    try {
      state.cart = JSON.parse(saved);
    } catch (err) {
      state.cart = [];
    }
  }
}


function cartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function openOverlay(html) {
  modalContentEl.innerHTML = html;
  overlayEl.classList.add("open");
}

function closeOverlay() {
  overlayEl.classList.remove("open");
}

overlayEl.addEventListener("click", (e) => {
  if (e.target === overlayEl) closeOverlay();
});

function renderCheckoutForm(prefill = {}) {
  openOverlay(`
    <h2>Delivery details</h2>
    <p class="modal-sub">We'll use this to get your order to you and confirm on TeleBirr.</p>
    <form id="checkout-form" novalidate>
      <div class="field" id="f-name">
        <label for="c-name">Full name</label>
        <input type="text" id="c-name" value="${prefill.name || ""}" placeholder="Abebe Kebede">
        <div class="field-error">Please enter your full name.</div>
      </div>
      <div class="field" id="f-phone">
        <label for="c-phone">Phone number</label>
        <input type="tel" id="c-phone" value="${prefill.phone || ""}" placeholder="+251 9XX XXX XXX">
        <div class="field-error">Enter a valid Ethiopian phone number.</div>
      </div>
      <div class="field" id="f-email">
        <label for="c-email">Email (optional)</label>
        <input type="email" id="c-email" value="${prefill.email || ""}" placeholder="you@example.com">
        <div class="field-error">That email doesn't look right.</div>
      </div>
      <div class="field" id="f-address">
        <label for="c-address">Delivery address</label>
        <textarea id="c-address" placeholder="Woreda, house number, nearest landmark...">${prefill.address || ""}</textarea>
        <div class="field-error">Please add a delivery address.</div>
      </div>
      <div class="field">
        <label for="c-notes">Notes for the rider (optional)</label>
        <textarea id="c-notes" placeholder="Gate code, floor, spice preference...">${prefill.notes || ""}</textarea>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn-secondary" id="cancel-btn">Cancel</button>
        <button type="submit" class="btn-primary">Continue to pay</button>
      </div>
    </form>
  `);

  document.getElementById("cancel-btn").addEventListener("click", closeOverlay);
  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    validateAndSubmit();
  });
}

function validateAndSubmit() {
  const name = document.getElementById("c-name").value.trim();
  const phone = document.getElementById("c-phone").value.trim();
  const email = document.getElementById("c-email").value.trim();
  const address = document.getElementById("c-address").value.trim();
  const notes = document.getElementById("c-notes").value.trim();

  const phonePattern = /^(\+251|0)?[79]\d{8}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;
  const setInvalid = (fieldId, bad) => {
    const el = document.getElementById(fieldId);
    el.classList.toggle("invalid", bad);
    if (bad) valid = false;
  };

  setInvalid("f-name", name.length < 2);
  setInvalid("f-phone", !phonePattern.test(phone.replace(/\s+/g, "")));
  setInvalid("f-email", email.length > 0 && !emailPattern.test(email));
  setInvalid("f-address", address.length < 5);

  if (!valid) return;

  renderPaymentStep({ name, phone, email, address, notes });
}

function renderPaymentStep(customer) {
  const total = cartTotal();
  const orderId = "AE-" + Math.floor(100000 + Math.random() * 900000);
  const itemLines = state.cart.map(item =>
    `<div class="order-line"><span>${item.name} × ${item.qty}</span><span>${item.price * item.qty} ETB</span></div>`
  ).join("");

  openOverlay(`
    <h2>Confirm & pay with TeleBirr</h2>
    <p class="modal-sub">Order for <strong>${customer.name}</strong> · ${customer.phone}</p>
    <div>
      ${itemLines}
      <div class="order-line" style="border-bottom:none;padding-top:12px;">
        <span style="color:var(--ink);font-weight:600;">Total</span>
        <span style="color:var(--green);font-weight:700;font-size:1.05rem;">${total} ETB</span>
      </div>
    </div>
    <p class="modal-sub">Delivering to: ${customer.address}</p>
    <div class="modal-actions">
      <button type="button" class="btn-secondary" id="back-btn">Back</button>
      <button type="button" class="btn-primary" id="pay-btn">Confirm & pay ${total} ETB</button>
    </div>
  `);

  document.getElementById("back-btn").addEventListener("click", () => renderCheckoutForm(customer));
  document.getElementById("pay-btn").addEventListener("click", () => {
    renderConfirmation(customer, orderId, total);
  });
}

function renderConfirmation(customer, orderId, total) {
  openOverlay(`
    <div class="confirm-icon">✓</div>
    <h2>Order confirmed</h2>
    <p class="modal-sub">A TeleBirr payment request for ${total} ETB was sent to ${customer.phone}. Approve it in your TeleBirr app to finish.</p>
    <div class="order-id">${orderId}</div>
    <div class="order-line"><span>Name</span><span>${customer.name}</span></div>
    <div class="order-line"><span>Phone</span><span>${customer.phone}</span></div>
    ${customer.email ? `<div class="order-line"><span>Email</span><span>${customer.email}</span></div>` : ""}
    <div class="order-line"><span>Address</span><span>${customer.address}</span></div>
    <div class="modal-actions">
      <button type="button" class="btn-primary" id="done-btn" style="flex:1;">Done</button>
    </div>
  `);
  document.getElementById("done-btn").addEventListener("click", () => {
    state.cart = [];
    saveCart();
    renderCart();
    closeOverlay();
  });
}

checkoutBtn.addEventListener("click", () => {
  if (state.cart.length === 0) return;
  renderCheckoutForm();
});


function init() {
  loadCart();
  loadMenu();
}

init();