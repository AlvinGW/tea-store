document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");
  const emptyMessage = document.getElementById("empty-message");
  const clearCartBtn = document.getElementById("clear-cart");

  const shippingThreshold = 2000;
  const shippingFee = 200;

  // Load cart from localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      checkEmptyCart();
      return;
    }

    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");
      itemEl.dataset.price = parseFloat(item.price.replace(/[^0-9.]/g, ""));

      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>${item.desc || ""}</p>
        </div>
        <div class="item-price">${item.price}</div>
        <div class="item-qty">
          <input type="number" value="${item.quantity}" min="1" class="qty-input">
        </div>
        <div class="item-subtotal">KES 0</div>
        <button class="remove-btn"><i class="bx bx-trash"></i></button>
      `;

      cartItemsContainer.appendChild(itemEl);
    });

    updateTotals();
    checkEmptyCart();
  }

  function updateTotals() {
    let subtotal = 0;
    const rows = cartItemsContainer.querySelectorAll(".cart-item");

    rows.forEach(row => {
      const price = parseFloat(row.dataset.price);
      const qtyInput = row.querySelector(".qty-input");
      const qty = parseInt(qtyInput.value);
      const subtotalCell = row.querySelector(".item-subtotal");

      const itemSubtotal = price * qty;
      subtotalCell.textContent = `KES ${itemSubtotal.toLocaleString()}`;
      subtotal += itemSubtotal;
    });

    subtotalEl.textContent = `KES ${subtotal.toLocaleString()}`;
    const shipping = subtotal >= shippingThreshold ? 0 : shippingFee;
    shippingEl.textContent = shipping === 0 ? "Free" : `KES ${shipping.toLocaleString()}`;
    const total = subtotal + shipping;
    totalEl.textContent = `KES ${total.toLocaleString()}`;
  }

  function checkEmptyCart() {
    const hasItems = cartItemsContainer.querySelectorAll(".cart-item").length > 0;
    emptyMessage.classList.toggle("show", !hasItems);
  }

  // Event delegation for quantity changes
  cartItemsContainer.addEventListener("input", e => {
    if (e.target.classList.contains("qty-input")) {
      const row = e.target.closest(".cart-item");
      const name = row.querySelector("h3").innerText;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const index = cart.findIndex(item => item.name === name);
      if (index !== -1) {
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      updateTotals();
    }
  });

  // Remove individual item
  cartItemsContainer.addEventListener("click", e => {
    if (e.target.closest(".remove-btn")) {
      const item = e.target.closest(".cart-item");
      const name = item.querySelector("h3").innerText;
      item.remove();

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter(product => product.name !== name);
      localStorage.setItem("cart", JSON.stringify(cart));

      updateTotals();
      checkEmptyCart();
    }
  });

  // Clear all items
  clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      localStorage.removeItem("cart");
      cartItemsContainer.innerHTML = "";
      updateTotals();
      checkEmptyCart();
    }
  });

  // Initialize
  loadCart();
});
