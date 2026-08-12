// Hold items in an array (this is your single source of truth)
let items = [];
let nextId = 1;

// Select necessary DOM elements
const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("list");
const count = document.getElementById("count");

// Write a render() function to rebuild the list from the array
function render() {
  // 1. Clear the current list
  list.innerHTML = "";

  // 2. Loop through the items array
  items.forEach((item) => {
    // 3. Create elements, use data-id on each row, and append to the list
    const li = document.createElement("li");
    li.dataset.id = item.id;
    if (item.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = item.text;
    li.appendChild(span);

    const del = document.createElement("span");
    del.textContent = "✕";
    del.className = "del";
    li.appendChild(del);

    list.appendChild(li);
  });

  // 4. Update the live count paragraph
  count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  // 1. preventDefault to stop page reload
  e.preventDefault();

  // 2. Read and validate the input
  const text = input.value.trim();
  if (!text) return;

  // 3. Push a new object to the items array (include a unique id and done: false)
  items.push({ id: nextId++, text, done: false });

  input.value = "";
  input.focus();

  // 4. Call render()
  render();
});

// Set up event delegation on the #list
list.addEventListener("click", (e) => {
  // 2. Use e.target and closest() to find the clicked row
  const row = e.target.closest("li");
  if (!row) return;

  const id = Number(row.dataset.id);

  // 3. Determine if the user is toggling ".done" or removing a row
  if (e.target.classList.contains("del")) {
    // Removing
    items = items.filter((item) => item.id !== id);
  } else {
    // Toggling done
    items = items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
  }

  // 5. Call render()
  render();
});

// Initial render so the count shows "0 items" on load
render();