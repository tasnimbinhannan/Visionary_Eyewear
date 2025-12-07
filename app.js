const STORAGE_KEYS = {
    CART: "visionary_cart",
    WISHLIST: "visionary_wishlist",
    USERS: "visionary_users",
    CURRENT_USER: "visionary_current_user",
    ORDERS: "visionary_orders",
};

const TAX_RATE = 0.08;

const state = {
    products: [],
    cart: [],
    wishlist: [],
    currentUser: null,
    users: [],
    orders: [],
    filters: {
        search: "",
        category: "all",
        shape: "all",
        sort: "featured",
    },
    selectedProduct: null,
    homeFeaturedCategory: "men",
};

function loadFromStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/* INITIALIZATION */

function initState() {
    state.products = PRODUCTS.slice();
    state.cart = loadFromStorage(STORAGE_KEYS.CART, []);
    state.wishlist = loadFromStorage(STORAGE_KEYS.WISHLIST, []);
    state.users = loadFromStorage(STORAGE_KEYS.USERS, []);
    state.currentUser = loadFromStorage(STORAGE_KEYS.CURRENT_USER, null);
    state.orders = loadFromStorage(STORAGE_KEYS.ORDERS, []);
}

function init() {
    initState();
    initHeaderNav();
    initHomePills();
    initShopControls();
    initCartActions();
    initCheckout();
    initAccount();
    initContact();

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const homeFeatured = document.getElementById("home-featured-grid");
    if (homeFeatured) {
        homeFeatured.addEventListener("click", handleProductCardClick);
    }

    renderAll();
}

/* NAVIGATION */

function showView(viewId) {
    const sections = document.querySelectorAll(".view-section");
    sections.forEach((s) => s.classList.remove("active"));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add("active");

    const links = document.querySelectorAll(".nav-link");
    links.forEach((l) => l.classList.remove("active"));
    links.forEach((l) => {
        if (l.dataset.nav === viewId) l.classList.add("active");
    });

    if (viewId === "shop") renderShop();
    if (viewId === "wishlist") renderWishlist();
    if (viewId === "cart") renderCart();
    if (viewId === "checkout") renderCheckoutSummary();
    if (viewId === "orders") renderOrders();
    if (viewId === "account") renderAccountPanels();
}

function initHeaderNav() {
    function handleNavClick(e) {
        const nav = e.target.closest("[data-nav]");
        if (!nav) return;

        const view = nav.dataset.nav;
        if (!view) return;

        if (nav.tagName === "A" || nav.tagName === "BUTTON") {
            e.preventDefault();
        }

        if (view === "orders") {
            if (!state.currentUser) {
                showToast("Please log in to view your orders.");
                showView("account");
            } else {
                showView("orders");
            }
        } else {
            showView(view);
            if (view === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }

    document.body.addEventListener("click", handleNavClick);
}

/* HOME COLLECTION PILLS */

function initHomePills() {
    const container = document.querySelector(".home-highlight");
    if (!container) return;

    container.addEventListener("click", (e) => {
        const pill = e.target.closest(".pill");
        if (!pill) return;

        const collection = pill.dataset.collection;

        container
            .querySelectorAll(".pill")
            .forEach((p) => p.classList.toggle("pill--active", p === pill));

        if (collection === "all") {
            showView("shop");
            return;
        }

        state.homeFeaturedCategory = collection || "all";
        renderHomeFeatured();
    });
}

/* SHOP */

function initShopControls() {
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");
    const filterShape = document.getElementById("filter-shape");
    const sortSelect = document.getElementById("sort-select");
    const grid = document.getElementById("product-grid");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.filters.search = e.target.value.trim().toLowerCase();
            renderShop();
        });
    }

    if (filterCategory) {
        filterCategory.addEventListener("change", (e) => {
            state.filters.category = e.target.value;
            renderShop();
        });
    }

    if (filterShape) {
        filterShape.addEventListener("change", (e) => {
            state.filters.shape = e.target.value;
            renderShop();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            state.filters.sort = e.target.value;
            renderShop();
        });
    }

    if (grid) {
        grid.addEventListener("click", handleProductCardClick);
    }
}

function handleProductCardClick(e) {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const productId = card.dataset.id;

    if (e.target.closest(".icon-heart-btn")) {
        toggleWishlist(productId);
        return;
    }

    if (e.target.closest(".btn-add-cart")) {
        addToCart(productId, 1);
        return;
    }

    openProduct(productId);
}

function getFilteredProducts() {
    let items = state.products.slice();
    const { search, category, shape, sort } = state.filters;

    if (search) {
        items = items.filter(
            (p) =>
                p.name.toLowerCase().includes(search) ||
                (p.brand && p.brand.toLowerCase().includes(search))
        );
    }

    if (category !== "all") {
        items = items.filter((p) => p.category === category);
    }

    if (shape !== "all") {
        items = items.filter((p) => p.shape === shape);
    }

    if (sort === "price-asc") {
        items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        items.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
        items = items.slice().reverse();
    }

    return items;
}

function renderShop() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const products = getFilteredProducts();

    if (!products.length) {
        grid.innerHTML =
            '<p class="empty-state">No products match your search. Try adjusting filters.</p>';
        return;
    }

    grid.innerHTML = products
        .map((p) => {
            const inWishlist = state.wishlist.includes(p.id);
            return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-thumb">
          <div class="product-tag-row">
            ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
            <span class="tag muted">${p.category}</span>
          </div>
          <img src="${p.image}" alt="${p.name}" class="product-thumb-img" />
        </div>
        <div class="product-card-body">
          <h3 class="product-title">${p.name}</h3>
          <p class="product-brand">${p.brand || ""}</p>
          <div class="product-price-row">
            <span class="price-main">$${p.price.toFixed(2)}</span>
            ${p.oldPrice
                    ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>`
                    : ""
                }
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn primary btn-add-cart" type="button">Add to cart</button>
          <button class="icon-heart-btn ${inWishlist ? "active" : ""
                }" type="button" aria-label="Wishlist"></button>
        </div>
      </article>
    `;
        })
        .join("");
}

function renderHomeFeatured() {
    const container = document.getElementById("home-featured-grid");
    if (!container) return;

    const cat = state.homeFeaturedCategory || "all";

    let items = state.products.slice();
    if (cat !== "all") {
        items = items.filter((p) => p.category === cat);
    }

    items = items.slice(0, 4);

    if (!items.length) {
        container.innerHTML =
            '<p class="empty-state">No featured items in this collection.</p>';
        return;
    }

    container.innerHTML = items
        .map((p) => {
            const inWishlist = state.wishlist.includes(p.id);
            return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-thumb">
          <div class="product-tag-row">
            ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
            <span class="tag muted">Featured</span>
          </div>
          <img src="${p.image}" alt="${p.name}" class="product-thumb-img" />
        </div>
        <div class="product-card-body">
          <h3 class="product-title">${p.name}</h3>
          <p class="product-brand">${p.brand || ""}</p>
          <div class="product-price-row">
            <span class="price-main">$${p.price.toFixed(2)}</span>
            ${p.oldPrice
                    ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>`
                    : ""
                }
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn primary btn-add-cart" type="button">Add to cart</button>
          <button class="icon-heart-btn ${inWishlist ? "active" : ""
                }" type="button" aria-label="Wishlist"></button>
        </div>
      </article>
    `;
        })
        .join("");
}

/* PRODUCT DETAIL */

function openProduct(productId) {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;
    state.selectedProduct = product;

    const container = document.getElementById("product-detail");
    if (!container) return;

    const inWishlist = state.wishlist.includes(product.id);

    container.innerHTML = `
    <div class="product-detail-img">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail-meta">
      <h2>${product.name}</h2>
      <p class="brand">${product.brand || ""}</p>
      <div class="product-price-row">
        <span class="price-main">$${product.price.toFixed(2)}</span>
        ${product.oldPrice
            ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>`
            : ""
        }
      </div>
      <div class="detail-specs">
        <span>Category: ${product.category}</span>
        <span>Shape: ${product.shape}</span>
      </div>
      <p style="margin-top:10px;font-size:13px;color:#4b5563;">
        ${product.description || ""}
      </p>
      <div class="detail-actions">
        <button class="btn primary" id="detail-add-cart">Add to cart</button>
        <button class="btn ghost" id="detail-toggle-wishlist">
          ${inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>
    </div>
  `;

    const addBtn = container.querySelector("#detail-add-cart");
    const wishBtn = container.querySelector("#detail-toggle-wishlist");

    if (addBtn) {
        addBtn.addEventListener("click", () => addToCart(product.id, 1));
    }

    if (wishBtn) {
        wishBtn.addEventListener("click", () => {
            toggleWishlist(product.id);
            openProduct(product.id);
        });
    }

    showView("product");
}

/* WISHLIST */

function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx === -1) {
        state.wishlist.push(productId);
        showToast("Added to wishlist.");
    } else {
        state.wishlist.splice(idx, 1);
        showToast("Removed from wishlist.");
    }

    saveToStorage(STORAGE_KEYS.WISHLIST, state.wishlist);

    renderWishlist();
    renderShop();
    renderHomeFeatured();
    updateBadges();
}

function renderWishlist() {
    const container = document.getElementById("wishlist-list");
    const emptyState = document.getElementById("wishlist-empty");
    if (!container || !emptyState) return;

    if (!state.wishlist.length) {
        container.innerHTML = "";
        emptyState.style.display = "flex";
        return;
    }

    emptyState.style.display = "none";

    const items = state.wishlist
        .map((id) => state.products.find((p) => p.id === id))
        .filter(Boolean);

    container.innerHTML = items
        .map((p) => {
            return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-thumb">
          <div class="product-tag-row">
            ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
            <span class="tag muted">Wishlist</span>
          </div>
          <img src="${p.image}" alt="${p.name}" class="product-thumb-img" />
        </div>
        <div class="product-card-body">
          <h3 class="product-title">${p.name}</h3>
          <p class="product-brand">${p.brand || ""}</p>
          <div class="product-price-row">
            <span class="price-main">$${p.price.toFixed(2)}</span>
            ${p.oldPrice
                    ? `<span class="price-old">$${p.oldPrice.toFixed(2)}</span>`
                    : ""
                }
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn primary btn-move-cart" type="button">Move to cart</button>
          <button class="btn ghost btn-remove-wishlist" type="button">Remove</button>
        </div>
      </article>
    `;
        })
        .join("");

    container.onclick = (e) => {
        const card = e.target.closest(".product-card");
        if (!card) return;
        const id = card.dataset.id;

        if (e.target.closest(".btn-move-cart")) {
            addToCart(id, 1);
            toggleWishlist(id);
        } else if (e.target.closest(".btn-remove-wishlist")) {
            toggleWishlist(id);
        } else {
            openProduct(id);
        }
    };
}

/* CART */

function initCartActions() {
    const btnCheckout = document.getElementById("btn-go-checkout");
    if (!btnCheckout) return;

    btnCheckout.addEventListener("click", () => {
        if (!state.cart.length) {
            showToast("Your cart is empty.");
            return;
        }
        showView("checkout");
        renderCheckoutSummary();
    });
}

function addToCart(productId, quantity) {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;
    const line = state.cart.find((c) => c.productId === productId);
    if (line) {
        line.quantity += quantity;
    } else {
        state.cart.push({ productId, quantity });
    }
    saveToStorage(STORAGE_KEYS.CART, state.cart);
    updateBadges();
    renderCart();
    showToast("Added to cart.");
}

function updateCartQuantity(productId, delta) {
    const line = state.cart.find((c) => c.productId === productId);
    if (!line) return;
    line.quantity += delta;
    if (line.quantity <= 0) {
        state.cart = state.cart.filter((c) => c.productId !== productId);
    }
    saveToStorage(STORAGE_KEYS.CART, state.cart);
    renderCart();
    updateBadges();
}

function removeCartItem(productId) {
    state.cart = state.cart.filter((c) => c.productId !== productId);
    saveToStorage(STORAGE_KEYS.CART, state.cart);
    renderCart();
    updateBadges();
}

function calcCartTotals(cart = state.cart) {
    let subtotal = 0;
    for (const line of cart) {
        const product = state.products.find((p) => p.id === line.productId);
        if (!product) continue;
        subtotal += product.price * line.quantity;
    }
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax };
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const emptyState = document.getElementById("cart-empty");
    if (!container || !emptyState) return;

    const layout = document.querySelector(".cart-layout");

    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryTax = document.getElementById("summary-tax");
    const summaryShipping = document.getElementById("summary-shipping");
    const summaryTotal = document.getElementById("summary-total");

    const { subtotal, tax } = calcCartTotals();
    const shippingText =
        subtotal === 0 ? "Calculated at checkout" : subtotal >= 120 ? "Free" : "$5.00";
    const total = subtotal + tax + (subtotal === 0 ? 0 : subtotal >= 120 ? 0 : 5);

    if (summarySubtotal) summarySubtotal.textContent = "$" + subtotal.toFixed(2);
    if (summaryTax) summaryTax.textContent = "$" + tax.toFixed(2);
    if (summaryShipping) summaryShipping.textContent = shippingText;
    if (summaryTotal) summaryTotal.textContent = "$" + total.toFixed(2);

    if (!state.cart.length) {
        container.innerHTML = "";
        emptyState.style.display = "flex";
        if (layout) layout.style.display = "none";
        return;
    }

    emptyState.style.display = "none";
    if (layout) layout.style.display = "grid";

    container.innerHTML = state.cart
        .map((line) => {
            const product = state.products.find((p) => p.id === line.productId);
            if (!product) return "";
            const linePrice = product.price * line.quantity;
            return `
      <article class="cart-item" data-id="${product.id}">
        <div class="cart-thumb" style="background-image:url('${product.image}');"></div>
        <div class="cart-meta">
          <h4>${product.name}</h4>
          <p>${product.brand || ""}</p>
          <div class="cart-qty">
            <button type="button" class="btn-qty" data-delta="-1">-</button>
            <span>${line.quantity}</span>
            <button type="button" class="btn-qty" data-delta="1">+</button>
          </div>
        </div>
        <div class="cart-price-col">
          <span class="line-price">$${linePrice.toFixed(2)}</span>
          <button class="cart-remove" type="button">Remove</button>
        </div>
      </article>
    `;
        })
        .join("");

    container.onclick = (e) => {
        const item = e.target.closest(".cart-item");
        if (!item) return;
        const id = item.dataset.id;

        if (e.target.closest(".btn-qty")) {
            const delta = Number(e.target.dataset.delta);
            updateCartQuantity(id, delta);
        } else if (e.target.closest(".cart-remove")) {
            removeCartItem(id);
        } else {
            openProduct(id);
        }
    };
}

/* CHECKOUT */

function initCheckout() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!state.cart.length) {
            showToast("Your cart is empty.");
            return;
        }
        const formData = new FormData(form);
        const shippingMethod = formData.get("shipping") || "standard";
        const shippingCost =
            shippingMethod === "standard" ? 5 : shippingMethod === "express" ? 15 : 0;

        const { subtotal, tax } = calcCartTotals();
        const total = subtotal + tax + shippingCost;

        const orderId =
            "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();

        const order = {
            id: orderId,
            createdAt: new Date().toISOString(),
            items: state.cart.slice(),
            subtotal,
            tax,
            shippingCost,
            total,
            shipping: {
                fullName: formData.get("fullName"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                address: formData.get("address"),
                city: formData.get("city"),
                zip: formData.get("zip"),
                country: formData.get("country"),
                method: shippingMethod,
            },
            paymentLast4: (formData.get("cardNumber") || "").slice(-4),
        };

        if (!state.currentUser) {
            showToast("Order saved as guest. Log in next time to track history.");
        }

        state.orders.push(order);
        saveToStorage(STORAGE_KEYS.ORDERS, state.orders);

        state.cart = [];
        saveToStorage(STORAGE_KEYS.CART, state.cart);
        updateBadges();
        renderCart();

        const orderIdEl = document.getElementById("order-id");
        if (orderIdEl) orderIdEl.textContent = orderId;
        showView("confirmation");
        form.reset();
    });

    form.addEventListener("change", (e) => {
        if (e.target.name === "shipping") {
            renderCheckoutSummary();
        }
    });
}

function renderCheckoutSummary() {
    const itemsContainer = document.getElementById("checkout-items");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const taxEl = document.getElementById("checkout-tax");
    const shippingEl = document.getElementById("checkout-shipping");
    const totalEl = document.getElementById("checkout-total");
    const form = document.getElementById("checkout-form");
    if (!itemsContainer || !subtotalEl || !taxEl || !shippingEl || !totalEl || !form)
        return;

    const { subtotal, tax } = calcCartTotals();
    const shippingRadio = form.querySelector('input[name="shipping"]:checked');
    const shippingCost = shippingRadio ? Number(shippingRadio.dataset.cost) : 0;
    const total = subtotal + tax + (subtotal === 0 ? 0 : shippingCost);

    if (!state.cart.length) {
        itemsContainer.innerHTML =
            '<p class="empty-state" style="margin-bottom:8px;">Your cart is empty.</p>';
    } else {
        itemsContainer.innerHTML = state.cart
            .map((line) => {
                const product = state.products.find((p) => p.id === line.productId);
                if (!product) return "";
                const linePrice = product.price * line.quantity;
                return `
        <div class="checkout-item">
          <span>${product.name} × ${line.quantity}</span>
          <span>$${linePrice.toFixed(2)}</span>
        </div>
      `;
            })
            .join("");
    }

    subtotalEl.textContent = "$" + subtotal.toFixed(2);
    taxEl.textContent = "$" + tax.toFixed(2);
    shippingEl.textContent = "$" + (subtotal === 0 ? 0 : shippingCost).toFixed(2);
    totalEl.textContent = "$" + total.toFixed(2);
}

/* ACCOUNT & AUTH */

function initAccount() {
    renderAccountPanels();
}

function renderAccountPanels() {
    const authPanel = document.getElementById("auth-panel");
    const profilePanel = document.getElementById("profile-panel");
    if (!authPanel || !profilePanel) return;

    if (!state.currentUser) {
        authPanel.innerHTML = `
      <h3>Welcome back</h3>
      <div class="auth-tabs">
        <button class="auth-tab active" data-mode="login">Login</button>
        <button class="auth-tab" data-mode="signup">Sign up</button>
      </div>
      <form class="auth-form" id="auth-form">
        <div id="auth-extra"></div>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required minlength="6" />
        </label>
        <button class="btn primary full-width" type="submit">Continue</button>
      </form>
    `;
        profilePanel.innerHTML = `
      <h3>Account</h3>
      <p class="empty-state">Log in or create an account to save your details and track orders.</p>
    `;

        setupAuthForm();
    } else {
        authPanel.innerHTML = `
      <h3>Hi, ${state.currentUser.name}</h3>
      <p style="font-size:13px;color:#6b7280;">You are logged in as ${state.currentUser.email}.</p>
      <button class="btn ghost" id="btn-logout">Log out</button>
    `;
        profilePanel.innerHTML = `
      <h3>Profile</h3>
      <div class="profile-info">
        <div class="profile-row"><span>Name</span> ${state.currentUser.name}</div>
        <div class="profile-row"><span>Email</span> ${state.currentUser.email}</div>
      </div>
      <button class="btn primary" data-nav="orders" style="margin-top:10px;">View my orders</button>
    `;

        const logoutBtn = document.getElementById("btn-logout");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                state.currentUser = null;
                saveToStorage(STORAGE_KEYS.CURRENT_USER, null);
                showToast("Logged out.");
                renderAccountPanels();
            });
        }
    }
}

function setupAuthForm() {
    const authTabs = document.querySelectorAll(".auth-tab");
    const authForm = document.getElementById("auth-form");
    const extra = document.getElementById("auth-extra");
    if (!authForm || !extra || !authTabs.length) return;

    let mode = "login";

    function updateMode(newMode) {
        mode = newMode;
        authTabs.forEach((t) =>
            t.classList.toggle("active", t.dataset.mode === mode)
        );
        if (mode === "signup") {
            extra.innerHTML = `
        <label>
          Name
          <input type="text" name="name" required />
        </label>
      `;
        } else {
            extra.innerHTML = "";
        }
    }

    authTabs.forEach((tab) => {
        tab.addEventListener("click", () => updateMode(tab.dataset.mode));
    });

    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(authForm);
        const email = formData.get("email").trim().toLowerCase();
        const password = formData.get("password");
        const name = formData.get("name")?.trim();

        if (mode === "signup") {
            if (state.users.some((u) => u.email === email)) {
                showToast("An account with this email already exists.");
                return;
            }
            const user = { name, email, password };
            state.users.push(user);
            state.currentUser = user;
            saveToStorage(STORAGE_KEYS.USERS, state.users);
            saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
            showToast("Account created.");
            renderAccountPanels();
        } else {
            const user = state.users.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) {
                showToast("Invalid email or password.");
                return;
            }
            state.currentUser = user;
            saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
            showToast("Logged in.");
            renderAccountPanels();
        }
    });
}

/* ORDERS */

function renderOrders() {
    const container = document.getElementById("orders-list");
    const empty = document.getElementById("orders-empty");
    if (!container || !empty) return;

    if (!state.currentUser) {
        container.innerHTML = "";
        empty.textContent = "Log in to see your orders.";
        empty.style.display = "block";
        return;
    }

    const userOrders = state.orders.filter(
        (o) => o.shipping.email === state.currentUser.email
    );

    if (!userOrders.length) {
        container.innerHTML = "";
        empty.textContent = "You have no orders yet.";
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    container.innerHTML = userOrders
        .slice()
        .reverse()
        .map((o) => {
            const created = new Date(o.createdAt);
            const itemsCount = o.items.reduce((sum, i) => sum + i.quantity, 0);
            return `
      <article class="order-card">
        <div class="order-header">
          <span>Order ${o.id}</span>
          <span>$${o.total.toFixed(2)}</span>
        </div>
        <div style="font-size:11px;color:#6b7280;">
          <div>${created.toLocaleString()}</div>
          <div>${itemsCount} item(s) • Shipping: ${o.shipping.method}</div>
          <div>To: ${o.shipping.fullName}, ${o.shipping.city}</div>
        </div>
      </article>
    `;
        })
        .join("");
}

/* CONTACT */

function initContact() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.reset();
        showToast("Message sent. We’ll get back to you soon.");
    });
}

/* BADGES & TOAST */

function updateBadges() {
    const cartCount = document.getElementById("cart-count");
    const wishlistCount = document.getElementById("wishlist-count");
    if (cartCount) cartCount.textContent = state.cart.length;
    if (wishlistCount) wishlistCount.textContent = state.wishlist.length;

    const cartIcon = document.querySelector(".cart-icon-header");
    const wishIcon = document.querySelector(".wishlist-icon-header");
    if (cartIcon) {
        cartIcon.classList.toggle("active", state.cart.length > 0);
    }
    if (wishIcon) {
        wishIcon.classList.toggle("active", state.wishlist.length > 0);
    }
}

let toastTimeout;
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

/* RENDER ALL */

function renderAll() {
    renderShop();
    renderHomeFeatured();
    renderWishlist();
    renderCart();
    renderAccountPanels();
    updateBadges();
}

/* START */

document.addEventListener("DOMContentLoaded", init);