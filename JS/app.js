document.addEventListener("DOMContentLoaded", () => {
  // --- Variables ---
  const productsContainer = document.getElementById("products");
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");
  const cartPanel = document.getElementById("cart");
  const cartBadge = document.querySelector(".cart-badge");
  const cartIcon = document.getElementById("cart-icon");
  const closeCartBtn = document.querySelector(".close-cart");
  const staffContainer = document.getElementById("staff-products");

  let products = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // --- Funciones ---

  async function loadProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      products = await res.json();

      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const price = params.get("price");
      const gender = params.get("gender");

      let itemsToShow = products;

      if (category) {
        itemsToShow = products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      } else if (price) {
        itemsToShow = products.filter(
          (p) =>
            (price === "greater" && p.price > 100) ||
            (price === "less" && p.price <= 100)
        );
      } else if (gender) {
        itemsToShow = products.filter(
          (p) =>
            (gender === "men" &&
              p.category.toLowerCase() === "men's clothing") ||
            (gender === "women" &&
              p.category.toLowerCase() === "women's clothing")
        );
      }

      displayProducts(itemsToShow);
      if (staffContainer) displayStaffPicks(products);
      renderCart();
    } catch (error) {
      console.error("Error cargando productos:", error);
      if (productsContainer)
        productsContainer.innerHTML = "<p>Error al cargar productos 😢</p>";
    }
  }

  function displayProducts(items) {
    productsContainer.innerHTML = "";
    if (!items.length) {
      productsContainer.innerHTML = "<p>No hay productos para mostrar.</p>";
      return;
    }
    items.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <div class="product-info">
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
            <button class="add-cart-btn" data-id="${p.id}">Agregar al carrito</button>
          </div>`;
      productsContainer.appendChild(card);
    });
    document.querySelectorAll(".add-cart-btn").forEach((btn) => {
      btn.addEventListener("click", () => addToCart(btn.dataset.id));
    });
  }

  function addToCart(id) {
    const product = products.find((p) => p.id == id);
    const existing = cart.find((item) => item.id == id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    updateCart();
  }

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;
    let totalQty = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
      totalQty += item.qty;
      const li = document.createElement("li");
      li.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <h4>${item.title}</h4>
            <p>$${item.price} x ${item.qty}</p>
            <p><strong>Total: $${(item.price * item.qty).toFixed(2)}</strong></p>
          </div>
          <button onclick="removeFromCart(${item.id})">❌</button>`;
      cartContainer.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartBadge.textContent = totalQty;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  };

  clearCartBtn?.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  function updateCart() {
    renderCart();
  }

  cartIcon?.addEventListener("click", (e) => {
    e.preventDefault();
    cartPanel.classList.add("open");
  });

  closeCartBtn?.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });

  function displayStaffPicks(arr) {
    if (!staffContainer) return;
    const recommended = arr.filter((p) => p.price > 100).slice(0, 4);
    staffContainer.innerHTML = "";
    recommended.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("staff-card");
      card.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <div class="staff-info">
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
          </div>`;
      staffContainer.appendChild(card);
    });
  }

  // --- Inicialización ---
  loadProducts();
});
