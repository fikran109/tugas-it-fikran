// Simpan keranjang di localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tambah produk
function addToCart(name, price) {
  let cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  alert(name + " ditambahkan ke keranjang!");
}

// Tampilkan keranjang di cart.html
function loadCart() {
  const cart = getCart();
  const tbody = document.querySelector("#cartTable tbody");
  const totalPriceEl = document.getElementById("totalPrice");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rp${item.price.toLocaleString()}</td>
      <td><button onclick="removeFromCart(${index})">Hapus</button></td>
    `;
    tbody.appendChild(row);
    total += item.price;
  });

  totalPriceEl.textContent = "Total: Rp" + total.toLocaleString();
}

// Hapus item
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
}

// Checkout
function checkout(event) {
  event.preventDefault();
  localStorage.removeItem("cart");
  alert("Pesanan Anda berhasil dibuat! Kami akan menghubungi Anda.");
  window.location.href = "index.html";
}

// Auto load cart jika di halaman cart.html
if (document.title.includes("Keranjang")) {
  window.onload = loadCart;
}
// Load keranjang (tampilan card)
function loadCart() {
  const cart = getCart();
  const cartContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>Rp${item.price.toLocaleString()}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
    `;
    cartContainer.appendChild(div);
    subtotal += item.price;
  });

  let shipping = cart.length > 0 ? 20000 : 0;
  subtotalEl.textContent = "Rp" + subtotal.toLocaleString();
  shippingEl.textContent = "Rp" + shipping.toLocaleString();
  totalEl.textContent = "Rp" + (subtotal + shipping).toLocaleString();
}
// Load ringkasan belanja di checkout
function loadCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkoutItems");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    let div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `${item.name} - Rp${item.price.toLocaleString()}`;
    container.appendChild(div);
    subtotal += item.price;
  });

  let shipping = cart.length > 0 ? 20000 : 0;
  subtotalEl.textContent = "Rp" + subtotal.toLocaleString();
  shippingEl.textContent = "Rp" + shipping.toLocaleString();
  totalEl.textContent = "Rp" + (subtotal + shipping).toLocaleString();
}

// Auto load di checkout.html
if (document.title.includes("Checkout")) {
  window.onload = loadCheckout;
}
