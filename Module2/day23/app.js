const state = {
  dishes: [],
  cart: [],
  search: ""
};


const menuEl = document.querySelector("#menu");
const cartItemsEl = document.querySelector("#cart-items");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");

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
  renderMenu();
  renderCart();
}

function renderMenu() {
  const term = state.search.toLowerCase();
  const shown = state.dishes.filter(d => d.name.toLowerCase().includes(term));

  if (shown.length === 0) {
    menuEl.innerHTML = `<p class="empty-cart">No traditional dishes found matching "${state.search}"</p>`;
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

function renderCart() {
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

function init() {
  loadCart();
  loadMenu();
}

init();