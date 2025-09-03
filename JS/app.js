// Elementos del DOM
const productsContainer = document.getElementById("products");
const cartBadge = document.querySelector(".cart-badge");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Actualiza el contador del carrito
function updateCartBadge() {
  cartBadge.textContent = cart.length;
}

// Agregar producto al carrito
function addToCart(id) {
  // Ver si ya está en el carrito
  const existing = cart.find(item => item.id === parseInt(id));
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: parseInt(id), quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert("Producto agregado al carrito ✅");
}

// Cargar productos desde FakeStore API
async function loadProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    displayProducts(products);
    updateCartBadge();
  } catch (error) {
    console.error(error);
    productsContainer.innerHTML = "<p>Error al cargar productos 😢</p>";
  }
}

// Mostrar productos en el DOM
function displayProducts(items) {
  productsContainer.innerHTML = "";

  items.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="product-info">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
        <button class="add-cart-btn" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;

    productsContainer.appendChild(card);
  });

  // Eventos de los botones "Agregar al carrito"
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
