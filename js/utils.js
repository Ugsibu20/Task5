/* ==========================================
   ElectroMart - utils.js
   Common Utility Functions
========================================== */

// ---------- Local Storage ----------

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (value === null) return [];

    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// ---------- Currency ----------

function formatPrice(price) {
    return "Rs. " + Number(price || 0).toLocaleString("en-IN");
}

// ---------- Toast ----------

function showToast(message = "Success!") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    const text = document.getElementById("toastMessage");

    if (text) {
        text.textContent = message;
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ---------- Rating Stars ----------

function generateStars(rating) {

    let html = "";

    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {

        if (i <= full) {
            html += '<i class="fa-solid fa-star"></i>';
        }
        else if (i === full + 1 && half) {
            html += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        else {
            html += '<i class="fa-regular fa-star"></i>';
        }

    }

    return html;
}

// ---------- Cart ----------

function getCart() {
    return getFromStorage("cart");
}

function saveCart(cart) {
    saveToStorage("cart", cart);
}

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll("#cartCount, .cart-count").forEach(el => {
        el.textContent = count;
    });

}

// ---------- Wishlist ----------

function getWishlist() {
    return getFromStorage("wishlist");
}

function saveWishlist(wishlist) {
    saveToStorage("wishlist", wishlist);
}

function updateWishlistCount() {

    const wishlist = getWishlist();

    document.querySelectorAll("#wishlistCount").forEach(el => {
        el.textContent = wishlist.length;
    });

}

// ---------- Find Product ----------

function findProduct(id) {
    return products.find(product => product.id == Number(id));
}

// ---------- Add To Cart ----------

function addToCart(id) {

    id = Number(id);

    const cart = getCart();

    const existing = cart.find(item => item.id == id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    showToast("Product added to cart");
}

// ---------- Add To Wishlist ----------

function addToWishlist(id) {

    id = Number(id);

    const wishlist = getWishlist();

    const exists = wishlist.find(item => item.id == id);

    if (!exists) {

        wishlist.push({
            id: id
        });

        saveWishlist(wishlist);

        updateWishlistCount();

        showToast("Added to wishlist");

    } else {

        showToast("Already in wishlist");

    }

}

// ---------- Remove From Cart ----------

function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id != id);

    saveCart(cart);

    updateCartCount();

}

// ---------- Remove From Wishlist ----------

function removeFromWishlist(id) {

    let wishlist = getWishlist();

    wishlist = wishlist.filter(item => item.id != id);

    saveWishlist(wishlist);

    updateWishlistCount();

}

// ---------- Search ----------

function searchProducts(keyword) {

    keyword = keyword.toLowerCase();

    return products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword) ||

        product.brand.toLowerCase().includes(keyword)

    );

}

// ---------- Price Filter ----------

function filterByPrice(maxPrice) {

    if (maxPrice === "all") {

        return products;

    }

    return products.filter(product => product.price <= Number(maxPrice));

}

// ---------- Category Filter ----------

function filterByCategory(category) {

    if (category === "all") {

        return products;

    }

    return products.filter(product => product.category === category);

}

// ---------- Sort ----------

function sortProducts(list, type) {

    const data = [...list];

    switch (type) {

        case "low-high":
            data.sort((a, b) => a.price - b.price);
            break;

        case "high-low":
            data.sort((a, b) => b.price - a.price);
            break;

        case "a-z":
            data.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "z-a":
            data.sort((a, b) => b.name.localeCompare(a.name));
            break;

        default:
            break;
    }

    return data;
}

// ---------- Pagination ----------

function paginate(list, page = 1, perPage = 8) {

    const start = (page - 1) * perPage;

    return list.slice(start, start + perPage);

}

// ---------- Product HTML ----------

function createProductCard(product) {

    return `

<div class="product-card" data-id="${product.id}">

    <div class="product-image">

        <img src="${product.image}" alt="${product.name}">

        <span class="discount-badge">
            ${product.discount}% OFF
        </span>

        <button class="wishlist-btn"
            onclick="addToWishlist(${product.id})">

            <i class="fa-regular fa-heart"></i>

        </button>

    </div>

    <div class="product-info">

        <p class="product-category">

            ${product.category}

        </p>

        <h3 class="product-title">

            ${product.name}

        </h3>

        <div class="rating">

            ${generateStars(product.rating)}

            <span>

                (${product.reviews})

            </span>

        </div>

        <div class="price-box">

            <span class="current-price">

                ${formatPrice(product.price)}

            </span>

            <span class="old-price">

                ${formatPrice(product.oldPrice)}

            </span>

        </div>

        <div class="product-actions">

    <button
        class="btn btn-primary"
        onclick="addToCart(${product.id})">

        <i class="fa-solid fa-cart-shopping"></i>

        Add to Cart

    </button>

    <button
        class="quick-view"
        onclick="quickView(${product.id})">

        <i class="fa-solid fa-eye"></i>

    </button>

</div>

    </div>

</div>

`;

}

// ---------- Initialize ----------

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    updateWishlistCount();

});
