/* ==========================================
   ElectroMart - products.js
   Part 1
========================================== */

// ================================
// Variables
// ================================

let filteredProducts = [...products];

let currentPage = 1;

const productsPerPage = 8;

// ================================
// DOM Elements
// ================================

const productsContainer = document.getElementById("productsContainer");

const productCount = document.getElementById("productCount");

// ================================
// Render Products
// ================================

function renderProducts(productList) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (productList.length === 0) {

        productsContainer.innerHTML = `

            <div class="empty-products">

                <h2>No Products Found</h2>

                <p>Try changing your search or filters.</p>

            </div>

        `;

        updateProductCount(0);

        return;
    }

    productList.forEach(product => {

        productsContainer.innerHTML += createProductCard(product);

    });

    updateProductCount(productList.length);

}

// ================================
// Update Product Count
// ================================

function updateProductCount(count) {

    if (!productCount) return;

    productCount.textContent = count;

}

// ================================
// Load Products
// ================================

function loadProducts() {

    const paginatedProducts = paginate(

        filteredProducts,

        currentPage,

        productsPerPage

    );

    renderProducts(paginatedProducts);

}

// ================================
// Reset Products
// ================================

function resetProducts() {

    filteredProducts = [...products];

    currentPage = 1;

    loadProducts();

}

// ================================
// Featured Products
// ================================

function getFeaturedProducts() {

    return products.filter(product => product.featured);

}

// ================================
// Best Seller Products
// ================================

function getBestSellerProducts() {

    return products.filter(product => product.bestseller);

}

// ================================
// Initialize Product Page
// ================================

function initializeProductsPage() {

    filteredProducts = [...products];

    currentPage = 1;

    loadProducts();

}

// ================================
// Initial Load
// ================================

document.addEventListener("DOMContentLoaded", () => {

    initializeProductsPage();

});

// ==========================================
// Filter DOM Elements
// ==========================================

const searchInput = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter") || document.getElementById("sortProducts");

function populateCategoryFilter() {

    if (!categoryFilter || !window.products) return;

    const currentValue = categoryFilter.value || "all";
    const categories = [...new Set(products.map(product => product.category))].sort();

    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `<option value="${category}">${category}</option>`).join("")}
    `;

    if ([...categoryFilter.options].some(option => option.value === currentValue)) {
        categoryFilter.value = currentValue;
    }

}

function getIncomingSearchKeyword() {

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("search") || params.get("q") || localStorage.getItem("searchKeyword") || "";

    localStorage.removeItem("searchKeyword");

    return keyword.trim();

}

// ==========================================
// Apply All Filters
// ==========================================

function applyFilters() {

    let result = [...products];

    // Search
    if (searchInput && searchInput.value.trim() !== "") {

        const keyword = searchInput.value.toLowerCase();

        result = result.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.brand.toLowerCase().includes(keyword) ||

            product.category.toLowerCase().includes(keyword)

        );

    }

    // Category
    if (

        categoryFilter &&

        categoryFilter.value !== "all"

    ) {

        result = result.filter(product =>

            product.category === categoryFilter.value

        );

    }

    // Price
    if (

        priceFilter &&

        priceFilter.value !== "all"

    ) {

        const maxPrice = Number(priceFilter.value);

        result = result.filter(product =>

            product.price <= maxPrice

        );

    }

    // Sort
    if (sortFilter) {

        switch (sortFilter.value) {

            case "low-high":

                result.sort((a, b) => a.price - b.price);

                break;

            case "high-low":

                result.sort((a, b) => b.price - a.price);

                break;

            case "a-z":

                result.sort((a, b) =>

                    a.name.localeCompare(b.name)

                );

                break;

            case "z-a":

                result.sort((a, b) =>

                    b.name.localeCompare(a.name)

                );

                break;

            case "rating":

                result.sort((a, b) =>

                    b.rating - a.rating

                );

                break;

            default:

                break;

        }

    }

    filteredProducts = result;

    currentPage = 1;

    loadProducts();

    renderPagination();

}

// ==========================================
// Search
// ==========================================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        applyFilters();

    });

}

// ==========================================
// Category Filter
// ==========================================

if (categoryFilter) {

    categoryFilter.addEventListener("change", () => {

        applyFilters();

    });

}

// ==========================================
// Price Filter
// ==========================================

if (priceFilter) {

    priceFilter.addEventListener("change", () => {

        applyFilters();

    });

}

// ==========================================
// Sort
// ==========================================

if (sortFilter) {

    sortFilter.addEventListener("change", () => {

        applyFilters();

    });

}

// ==========================================
// Clear Filters
// ==========================================

function clearFilters() {

    if (searchInput) searchInput.value = "";

    if (categoryFilter) categoryFilter.value = "all";

    if (priceFilter) priceFilter.value = "all";

    if (sortFilter) sortFilter.value = "default";

    filteredProducts = [...products];

    currentPage = 1;

    loadProducts();

    renderPagination();

}

// ==========================================
// Search from Header
// ==========================================

function loadIncomingSearch() {

    const keyword = getIncomingSearchKeyword();

    if (keyword && searchInput) {

        searchInput.value = keyword;

    }

}


// ==========================================
// Pagination Elements
// ==========================================

const paginationContainer = document.getElementById("pagination") || document.querySelector(".pagination");

// ==========================================
// Total Pages
// ==========================================

function getTotalPages() {

    return Math.ceil(filteredProducts.length / productsPerPage);

}

// ==========================================
// Render Pagination
// ==========================================

function renderPagination() {

    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    const totalPages = getTotalPages();

    if (totalPages <= 1) return;

    // Previous Button

    const prevBtn = document.createElement("button");

    prevBtn.innerHTML = "&laquo;";

    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            loadProducts();

            renderPagination();

            scrollToProducts();

        }

    });

    paginationContainer.appendChild(prevBtn);

    // Page Numbers

    for (let i = 1; i <= totalPages; i++) {

        const pageBtn = document.createElement("button");

        pageBtn.textContent = i;

        if (i === currentPage) {

            pageBtn.classList.add("active");

        }

        pageBtn.addEventListener("click", () => {

            currentPage = i;

            loadProducts();

            renderPagination();

            scrollToProducts();

        });

        paginationContainer.appendChild(pageBtn);

    }

    // Next Button

    const nextBtn = document.createElement("button");

    nextBtn.innerHTML = "&raquo;";

    nextBtn.disabled = currentPage === totalPages;

    nextBtn.addEventListener("click", () => {

        if (currentPage < totalPages) {

            currentPage++;

            loadProducts();

            renderPagination();

            scrollToProducts();

        }

    });

    paginationContainer.appendChild(nextBtn);

}

// ==========================================
// Scroll to Product Section
// ==========================================

function scrollToProducts() {

    const section = document.querySelector(".products-page");

    if (!section) return;

    window.scrollTo({

        top: section.offsetTop - 80,

        behavior: "smooth"

    });

}

// ==========================================
// Update Product Result Text
// ==========================================

function updateResultsInfo() {

    const resultText = document.getElementById("resultsText");

    if (!resultText) return;

    resultText.textContent = `Showing ${filteredProducts.length} Products`;

}

// ==========================================
// Refresh Product View
// ==========================================

function refreshProducts() {

    loadProducts();

    renderPagination();

    updateResultsInfo();

}

// ==========================================
// Override Load Products
// ==========================================

function loadProducts() {

    const pageProducts = paginate(

        filteredProducts,

        currentPage,

        productsPerPage

    );

    renderProducts(pageProducts);

    updateProductCount(filteredProducts.length);

    updateResultsInfo();

}

// ==========================================
// Initialize Pagination
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderPagination();

    updateResultsInfo();

});

/* ==========================================
   ElectroMart - products.js
   Part 4
========================================== */

// ==========================================
// Recently Viewed
// ==========================================

function saveRecentlyViewed(productId) {

    let recent = getFromStorage("recentProducts");

    recent = recent.filter(id => id !== productId);

    recent.unshift(productId);

    recent = recent.slice(0, 8);

    saveToStorage("recentProducts", recent);

}

function loadRecentlyViewed() {

    const container = document.getElementById("recentProducts");

    if (!container) return;

    const recent = getFromStorage("recentProducts");

    if (recent.length === 0) {

        container.innerHTML = "<p>No recently viewed products.</p>";

        return;

    }

    container.innerHTML = "";

    recent.forEach(id => {

        const product = findProduct(id);

        if (product) {

            container.innerHTML += createProductCard(product);

        }

    });

}

// ==========================================
// Best Sellers
// ==========================================

function loadBestSellers() {

    const container = document.getElementById("bestSellerProducts");

    if (!container) return;

    container.innerHTML = "";

    const best = products.filter(product => product.bestseller);

    best.slice(0, 8).forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

// ==========================================
// Featured Products
// ==========================================

function loadFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    if (!container) return;

    container.innerHTML = "";

    const featured = products.filter(product => product.featured);

    featured.slice(0, 8).forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

// ==========================================
// Quick View
// ==========================================

function quickView(productId) {

    saveRecentlyViewed(productId);

    openQuickView(productId);

}

// ==========================================
// Wishlist Toggle
// ==========================================

function toggleWishlist(productId) {

    const wishlist = getWishlist();

    const exists = wishlist.find(item => item.id === productId);

    if (exists) {

        removeFromWishlist(productId);

        showToast("Removed from Wishlist");

    } else {

        addToWishlist(productId);

    }

}

// ==========================================
// Buy Now
// ==========================================

function buyNow(productId) {

    addToCart(productId);

    window.location.href = "checkout.html";

}

// ==========================================
// Product Details
// ==========================================

function viewProduct(productId) {

    saveRecentlyViewed(productId);

    localStorage.setItem("selectedProduct", productId);

    window.location.href = "product.html";

}

// ==========================================
// Product Card Events
// ==========================================

document.addEventListener("click", function (e) {

    const card = e.target.closest(".product-card");

    if (!card) return;

    const id = Number(card.dataset.id);

    if (!id) return;

    saveRecentlyViewed(id);

});

// ==========================================
// Initialize Extra Sections
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadFeaturedProducts();

    loadBestSellers();

    loadRecentlyViewed();

});


// ==========================================
// Statistics
// ==========================================

function updateStatistics() {

    const totalProducts = document.getElementById("totalProducts");
    const totalCategories = document.getElementById("totalCategories");

    if (totalProducts) {
        totalProducts.textContent = products.length;
    }

    if (totalCategories) {

        const categories = [...new Set(products.map(p => p.category))];

        totalCategories.textContent = categories.length;
    }

}

// ==========================================
// Load Category From URL
// Example:
// products.html?category=Laptop
// ==========================================

function loadCategoryFromURL() {

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (!category) return;

    if (categoryFilter) {

        categoryFilter.value = category;

    }

    applyFilters();

}

// ==========================================
// Empty State
// ==========================================

function showEmptyState() {

    if (!productsContainer) return;

    productsContainer.innerHTML = `

        <div class="empty-products">

            <img
                src="https://picsum.photos/250?grayscale"
                alt="No Products">

            <h2>No Products Found</h2>

            <p>

                Try changing the search keyword
                or filter options.

            </p>

            <button
                class="btn btn-primary"
                onclick="clearFilters()">

                Clear Filters

            </button>

        </div>

    `;

}

// ==========================================
// Override Render Products
// ==========================================

const oldRenderProducts = renderProducts;

renderProducts = function (list) {

    if (list.length === 0) {

        showEmptyState();

        updateProductCount(0);

        return;

    }

    oldRenderProducts(list);

};

// ==========================================
// Scroll To Top After Filter
// ==========================================

function refreshPageView() {

    loadProducts();

    renderPagination();

    updateResultsInfo();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// ==========================================
// Performance
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

if (searchInput) {

    searchInput.removeEventListener("input", applyFilters);

    searchInput.addEventListener(

        "input",

        debounce(applyFilters, 300)

    );

}

// ==========================================
// Reset on Reload
// ==========================================

window.addEventListener("beforeunload", () => {

    localStorage.removeItem("searchKeyword");

});

// ==========================================
// Initialize Everything
// ==========================================

function initializeProductPage() {

    filteredProducts = [...products];

    currentPage = 1;

    populateCategoryFilter();

    loadIncomingSearch();

    loadCategoryFromURL();

    updateStatistics();

    applyFilters();

    renderPagination();

    updateResultsInfo();

    loadFeaturedProducts();

    loadBestSellers();

    loadRecentlyViewed();

}

// ==========================================
// Final Startup
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeProductPage();

    console.log("Products Page Loaded Successfully");

});
