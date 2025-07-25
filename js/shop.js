// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-cart-btn");
  const cartCount = document.querySelector(".cart-count");

  // Initialize cart count on page load
  updateCartCount();

  // Add click listeners to all "Add to Cart" buttons
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = button.closest(".product-card");

      const product = {
        name: productCard.querySelector("h3").innerText,
        price: productCard.querySelector(".price").innerText,
        image: productCard.querySelector("img").getAttribute("src"),
        quantity: 1
      };

      addToCart(product);
    });
  });

  // Add to cart in localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item exists, update quantity if so
    const existingIndex = cart.findIndex((item) => item.name === product.name);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Update cart count badge
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.innerText = totalItems;
  }

  // Scroll-in animation using Intersection Observer
  const cards = document.querySelectorAll(".product-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);
  });
});

