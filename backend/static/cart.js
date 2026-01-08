let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function toggleCart() {
  const box = document.getElementById("cartBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

/**
 * item = {
 *  model,
 *  store,
 *  price,
 *  sk,
 *  image
 * }
 */
function addToCart(item) {
  // liczymy oszczędność / stratę
  const diff = item.price - item.sk;

  cart.push({
    model: item.model,
    store: item.store,
    price: item.price,
    sk: item.sk,
    diff: diff,
    image: item.image
  });

  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotal");

  box.innerHTML = "";
  count.textContent = cart.length;

  let sum = 0;

  cart.forEach((item, i) => {
    sum += item.diff;

    box.innerHTML += `
      <div style="
        display:flex;
        gap:12px;
        align-items:center;
        margin-bottom:14px;
        background:#020617;
        padding:10px;
        border-radius:14px;
        border:1px solid #1f2937;
      ">
        <img src="${item.image}" style="width:60px">
        <div style="flex:1">
          <strong>${item.model}</strong><br>
          <small>${item.store}: ${item.price} zł</small><br>
          <small style="color:${item.diff > 0 ? '#ef4444' : '#22c55e'}">
            ${item.diff > 0 ? "Drożej o" : "Taniej o"} ${Math.abs(item.diff)} zł
          </small>
        </div>
        <button onclick="removeFromCart(${i})"
          style="
            background:#ef4444;
            border:none;
            border-radius:8px;
            color:white;
            cursor:pointer;
            padding:6px 10px;
          ">
          ✕
        </button>
      </div>
    `;
  });

  total.innerHTML = `
    <hr>
    Łącznie ${
      sum > 0 ? "przepłacasz" : "oszczędzasz"
    }: <strong style="color:${sum > 0 ? '#ef4444' : '#22c55e'}">
      ${Math.abs(sum)} zł
    </strong>
  `;
}

renderCart();
