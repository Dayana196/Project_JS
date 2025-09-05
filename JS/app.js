document.addEventListener("DOMContentLoaded", () => {

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

    // Cargar productos desde API
    async function loadProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            products = await res.json();
            console.log("Productos cargados:", products); // Para verificar
            displayProducts(products);
            displayStaffPicks(products);
            renderCart();
        } catch (error) {
            productsContainer.innerHTML = "<p>Error al cargar productos 😢</p>";
            console.error("Error cargando productos:", error);
        }
    }

    // Mostrar productos
    function displayProducts(items) {
        productsContainer.innerHTML = "";

        if (items.length === 0) {
            productsContainer.innerHTML = "<p>No hay productos para mostrar.</p>";
            return;
        }

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

        // Añadir evento a botones "Agregar al carrito"
        document.querySelectorAll(".add-cart-btn").forEach(btn => {
            btn.addEventListener("click", () => addToCart(btn.dataset.id));
        });
    }

    function goToCollection(gender) {
        window.location.href = `collection.html?gender=${gender}`;
    }

    // Filtrar productos por categoría (men/women)
    function filterByCategory(gender) {
        let category = "";
        if (gender === "men") category = "men's clothing";
        else if (gender === "women") category = "women's clothing";

        const filtered = products.filter(p => p.category.toLowerCase() === category);
        displayProducts(filtered);
    }

    // Filtrar productos por precio
    function filterByPrice(type) {
        let filtered = [];
        if (type === "greater") {
            filtered = products.filter(p => p.price > 200);
        } else if (type === "less") {
            filtered = products.filter(p => p.price <= 200);
        } else {
            filtered = products;
        }
        displayProducts(filtered);
    }

    // Añadir eventos a los botones de filtro de precios
    // Pero antes asegúrate que esos botones existan en el HTML
    const filterGreaterBtn = document.getElementById("filter-greater-btn");
    const filterLessBtn = document.getElementById("filter-less-btn");

    if (filterGreaterBtn) {
        filterGreaterBtn.addEventListener("click", () => filterByPrice("greater"));
    }
    if (filterLessBtn) {
        filterLessBtn.addEventListener("click", () => filterByPrice("less"));
    }

    // Agregar producto al carrito
    function addToCart(id) {
        const product = products.find(p => p.id == id);
        const item = cart.find(p => p.id == id);

        if (item) {
            item.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        updateCart();
    }

    // Renderizar carrito
    function renderCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;

            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price} x ${item.qty}</p>
                    <p><strong>Total: $${(item.price * item.qty).toFixed(2)}</strong></p>
                </div>
                <button onclick="removeFromCart(${item.id})">❌</button>
            `;

            cartContainer.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
        cartBadge.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Eliminar producto del carrito
    window.removeFromCart = function (id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };

    // Vaciar carrito
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    // Actualizar carrito (render y guardar)
    function updateCart() {
        renderCart();
    }

    // Abrir carrito
    cartIcon.addEventListener("click", e => {
        e.preventDefault();
        cartPanel.classList.add("open");
    });

    // Cerrar carrito
    closeCartBtn.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });

    function displayStaffPicks(items) {
        const staffContainer = document.getElementById("staff-products");
        if (!staffContainer) return; // 👈 Si no existe, simplemente salta la función

        staffContainer.innerHTML = "";

        const recommended = items.filter(p => p.price > 100).slice(0, 4);

        recommended.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("staff-card");
            card.innerHTML = `
            <img src="${p.image}" alt="${p.title}">
            <div class="staff-info">
                <h3>${p.title}</h3>
                <p>$${p.price}</p>
            </div>
        `;
            staffContainer.appendChild(card);
        });
    }


    // Inicializar todo
    loadProducts();

});
