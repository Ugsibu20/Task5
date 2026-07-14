/* ==========================================
   ElectroMart - wishlist.js
   Part 1
========================================== */

// ==========================================
// Variables
// ==========================================

let wishlist = getWishlist();

// ==========================================
// DOM Elements
// ==========================================

const wishlistContainer = document.getElementById("wishlistItems") || document.getElementById("wishlistContainer");
const emptyWishlist = document.getElementById("emptyWishlist");
const wishlistCount = document.getElementById("wishlistCount");

// ==========================================
// Load Wishlist
// ==========================================

function loadWishlist() {

    wishlist = getWishlist();

    renderWishlist();

    updateWishlistSummary();

}

// ==========================================
// Render Wishlist
// ==========================================

function renderWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        showEmptyWishlist();

        return;

    }

    hideEmptyWishlist();

    wishlist.forEach(item => {

        const product = findProduct(item.id);

        if (!product) return;

        wishlistContainer.innerHTML += createWishlistItem(product);

    });

}

// ==========================================
// Wishlist Item HTML
// ==========================================

function createWishlistItem(product) {

    return `

<div class="wishlist-item">

    <div class="wishlist-image">

        <img src="${product.image}" alt="${product.name}">

    </div>

    <div class="wishlist-info">

        <h3>${product.name}</h3>

        <p>${product.brand}</p>

        <span class="price">

            ${formatPrice(product.price)}

        </span>

    </div>

    <div class="wishlist-actions">

        <button
            class="btn btn-primary"
            onclick="moveToCart(${product.id})">

            <i class="fa-solid fa-cart-shopping"></i>

            Add to Cart

        </button>

        <button
            class="btn btn-danger"
            onclick="removeWishlistItem(${product.id})">

            <i class="fa-solid fa-trash"></i>

            Remove

        </button>

    </div>

</div>

`;

}

// ==========================================
// Empty Wishlist
// ==========================================

function showEmptyWishlist() {

    if (emptyWishlist) {

        emptyWishlist.style.display = "block";

    }

}

function hideEmptyWishlist() {

    if (emptyWishlist) {

        emptyWishlist.style.display = "none";

    }

}

// ==========================================
// Wishlist Summary
// ==========================================

function updateWishlistSummary() {

    if (!wishlistCount) return;

    wishlistCount.textContent = wishlist.length;

    updateWishlistCount();

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadWishlist();

});

/* ==========================================
   ElectroMart - wishlist.js
   Part 2
========================================== */

// ==========================================
// Remove Wishlist Item
// ==========================================

function removeWishlistItem(productId) {

    wishlist = wishlist.filter(item => item.id != productId);

    saveWishlist(wishlist);

    renderWishlist();

    updateWishlistSummary();

    showToast("Product removed from wishlist");

}

// ==========================================
// Move To Cart
// ==========================================

function moveToCart(productId) {

    const cart = getCart();

    const existing = cart.find(item => item.id == productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: Number(productId),
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    removeWishlistItem(productId);

    showToast("Product moved to cart");

}

// ==========================================
// Move All To Cart
// ==========================================

function moveAllToCart() {

    if (wishlist.length === 0) {

        showToast("Wishlist is empty");

        return;

    }

    const cart = getCart();

    wishlist.forEach(item => {

        const existing = cart.find(cartItem => cartItem.id == item.id);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
            id: Number(item.id),
                quantity: 1
            });

        }

    });

    saveCart(cart);

    updateCartCount();

    wishlist = [];

    saveWishlist(wishlist);

    renderWishlist();

    updateWishlistSummary();

    showToast("All products moved to cart");

}

// ==========================================
// Clear Wishlist
// ==========================================

function clearWishlist() {

    if (!confirm("Clear your wishlist?")) {

        return;

    }

    wishlist = [];

    saveWishlist(wishlist);

    renderWishlist();

    updateWishlistSummary();

    showToast("Wishlist cleared");

}

// ==========================================
// Continue Shopping
// ==========================================

function continueShopping() {

    window.location.href = "products.html";

}

// ==========================================
// Refresh Wishlist
// ==========================================

function refreshWishlist() {

    wishlist = getWishlist();

    renderWishlist();

    updateWishlistSummary();

}

// ==========================================
// Auto Save
// ==========================================

window.addEventListener("beforeunload", () => {

    saveWishlist(wishlist);

});

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    refreshWishlist();

});

/* ==========================================
   ElectroMart - wishlist.js
   Part 3
========================================== */

// ==========================================
// DOM Elements
// ==========================================

const wishlistSearch = document.getElementById("wishlistSearch");
const wishlistSort = document.getElementById("wishlistSort");
const wishlistCategory = document.getElementById("wishlistCategory");

let filteredWishlist = [];

// ==========================================
// Apply Filters
// ==========================================

function applyWishlistFilters() {

    filteredWishlist = [...wishlist];

    // Search
    if (wishlistSearch && wishlistSearch.value.trim() !== "") {

        const keyword = wishlistSearch.value.toLowerCase();

        filteredWishlist = filteredWishlist.filter(item => {

            const product = findProduct(item.id);

            if (!product) return false;

            return (
                product.name.toLowerCase().includes(keyword) ||
                product.brand.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword)
            );

        });

    }

    // Category
    if (
        wishlistCategory &&
        wishlistCategory.value !== "all"
    ) {

        filteredWishlist = filteredWishlist.filter(item => {

            const product = findProduct(item.id);

            return (
                product &&
                product.category === wishlistCategory.value
            );

        });

    }

    // Sort
    if (wishlistSort) {

        filteredWishlist.sort((a, b) => {

            const productA = findProduct(a.id);
            const productB = findProduct(b.id);

            if (!productA || !productB) return 0;

            switch (wishlistSort.value) {

                case "price-low":

                    return productA.price - productB.price;

                case "price-high":

                    return productB.price - productA.price;

                case "name-asc":

                    return productA.name.localeCompare(productB.name);

                case "name-desc":

                    return productB.name.localeCompare(productA.name);

                default:

                    return 0;

            }

        });

    }

    renderFilteredWishlist();

}

// ==========================================
// Render Filtered Wishlist
// ==========================================

function renderFilteredWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (filteredWishlist.length === 0) {

        wishlistContainer.innerHTML = `

<div class="empty-products">

    <h2>No Matching Products</h2>

    <p>Try changing your search or filters.</p>

</div>

`;

        return;

    }

    filteredWishlist.forEach(item => {

        const product = findProduct(item.id);

        if (!product) return;

        wishlistContainer.innerHTML += createWishlistItem(product);

    });

}

// ==========================================
// Reset Filters
// ==========================================

function resetWishlistFilters() {

    if (wishlistSearch)
        wishlistSearch.value = "";

    if (wishlistSort)
        wishlistSort.value = "default";

    if (wishlistCategory)
        wishlistCategory.value = "all";

    filteredWishlist = [...wishlist];

    renderFilteredWishlist();

}

// ==========================================
// Event Listeners
// ==========================================

if (wishlistSearch) {

    wishlistSearch.addEventListener("input", () => {

        applyWishlistFilters();

    });

}

if (wishlistSort) {

    wishlistSort.addEventListener("change", () => {

        applyWishlistFilters();

    });

}

if (wishlistCategory) {

    wishlistCategory.addEventListener("change", () => {

        applyWishlistFilters();

    });

}

// ==========================================
// Initialize Filters
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    filteredWishlist = [...wishlist];

    renderFilteredWishlist();

});

/* ==========================================
   ElectroMart - wishlist.js
   Part 4
========================================== */

// ==========================================
// Wishlist Statistics
// ==========================================

function updateWishlistStatistics() {

    const totalItems = document.getElementById("wishlistTotalItems");
    const totalValue = document.getElementById("wishlistTotalValue");

    let value = 0;

    wishlist.forEach(item => {

        const product = findProduct(item.id);

        if (product) {

            value += product.price;

        }

    });

    if (totalItems) {

        totalItems.textContent = wishlist.length;

    }

    if (totalValue) {

        totalValue.textContent = formatPrice(value);

    }

}

// ==========================================
// Recommended Products
// ==========================================

function loadWishlistRecommendations() {

    const container = document.getElementById("wishlistRecommendations") || document.getElementById("recommendedProducts");

    if (!container) return;

    container.innerHTML = "";

    const recommendations = [...products]
        .filter(product =>
            !wishlist.some(item => item.id == product.id)
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    recommendations.forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

// ==========================================
// Share Wishlist
// ==========================================

function shareWishlist() {

    if (wishlist.length === 0) {

        showToast("Wishlist is empty");

        return;

    }

    const text = wishlist.map(item => {

        const product = findProduct(item.id);

        return product ? product.name : "";

    }).join("\n");

    if (navigator.share) {

        navigator.share({

            title: "My ElectroMart Wishlist",

            text: text

        });

    } else {

        navigator.clipboard.writeText(text);

        showToast("Wishlist copied to clipboard");

    }

}

// ==========================================
// Export Wishlist
// ==========================================

function exportWishlist() {

    const data = JSON.stringify(wishlist, null, 2);

    const blob = new Blob([data], {

        type: "application/json"

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "ElectroMart-Wishlist.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast("Wishlist exported");

}

// ==========================================
// Wishlist Insights
// ==========================================

function loadWishlistInsights() {

    const insights = document.getElementById("wishlistInsights");

    if (!insights) return;

    const brands = {};

    wishlist.forEach(item => {

        const product = findProduct(item.id);

        if (!product) return;

        brands[product.brand] =

            (brands[product.brand] || 0) + 1;

    });

    let favoriteBrand = "-";
    let max = 0;

    for (const brand in brands) {

        if (brands[brand] > max) {

            max = brands[brand];

            favoriteBrand = brand;

        }

    }

    insights.innerHTML = `

<div class="insight-card">

    <h4>Wishlist Insights</h4>

    <p><strong>Total Products:</strong> ${wishlist.length}</p>

    <p><strong>Favorite Brand:</strong> ${favoriteBrand}</p>

</div>

`;

}

// ==========================================
// Refresh Dashboard
// ==========================================

function refreshWishlistDashboard() {

    updateWishlistStatistics();

    loadWishlistRecommendations();

    loadWishlistInsights();

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    refreshWishlistDashboard();

});

/* ==========================================
   ElectroMart - wishlist.js
   Part 5 (Final)
========================================== */

// ==========================================
// Import Wishlist
// ==========================================

function importWishlist(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const importedWishlist = JSON.parse(e.target.result);

            if (!Array.isArray(importedWishlist)) {

                throw new Error();

            }

            wishlist = importedWishlist;

            saveWishlist(wishlist);

            refreshWishlist();

            refreshWishlistDashboard();

            showToast("Wishlist imported successfully");

        } catch {

            showToast("Invalid wishlist file");

        }

    };

    reader.readAsText(file);

}

// ==========================================
// Cleanup Wishlist
// ==========================================

function cleanWishlist() {

    wishlist = wishlist.filter(item => {

        return findProduct(item.id);

    });

    saveWishlist(wishlist);

}

// ==========================================
// Sync Wishlist
// ==========================================

function syncWishlist() {

    wishlist = getWishlist();

    renderWishlist();

    updateWishlistSummary();

    updateWishlistStatistics();

}

// ==========================================
// Performance Optimization
// ==========================================

function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

// ==========================================
// Debounced Search
// ==========================================

if (wishlistSearch) {

    wishlistSearch.removeEventListener("input", applyWishlistFilters);

    wishlistSearch.addEventListener(

        "input",

        debounce(applyWishlistFilters, 300)

    );

}

// ==========================================
// Storage Sync
// ==========================================

window.addEventListener("storage", (event) => {

    if (event.key === "wishlist") {

        syncWishlist();

    }

});

// ==========================================
// Before Unload
// ==========================================

window.addEventListener("beforeunload", () => {

    saveWishlist(wishlist);

});

// ==========================================
// Refresh Everything
// ==========================================

function refreshEverything() {

    cleanWishlist();

    refreshWishlist();

    refreshWishlistDashboard();

}

// ==========================================
// Final Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const clearWishlistBtn = document.getElementById("clearWishlist");

    if (clearWishlistBtn) {

        clearWishlistBtn.addEventListener("click", clearWishlist);

    }

    refreshEverything();

    console.log("Wishlist Page Loaded Successfully");

});
