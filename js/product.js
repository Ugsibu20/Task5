/* ==========================================
   ElectroMart - product.js
   Part 1
========================================== */

// ==========================================
// Variables
// ==========================================

let currentProduct = null;
let selectedQuantity = 1;

// ==========================================
// Get Product ID
// ==========================================

function getProductId() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (id) return Number(id);

    const savedId = localStorage.getItem("selectedProduct");

    return savedId ? Number(savedId) : null;

}

// ==========================================
// Load Product
// ==========================================

function loadProduct() {

    const productId = getProductId();

    if (!productId) {

        showProductNotFound();

        return;

    }

    currentProduct = findProduct(productId);

    if (!currentProduct) {

        showProductNotFound();

        return;

    }

    renderProduct(currentProduct);

}

// ==========================================
// Render Product
// ==========================================

function renderProduct(product) {

    // Image

    const image = document.getElementById("productImage");

    if (image) {

        image.src = product.image;

        image.alt = product.name;

    }

    // Title

    const title = document.getElementById("productTitle");

    if (title) {

        title.textContent = product.name;

    }

    // Brand

    const brand = document.getElementById("productBrand");

    if (brand) {

        brand.textContent = product.brand;

    }

    // Category

    const category = document.getElementById("productCategory");

    if (category) {

        category.textContent = product.category;

    }

    // Price

    const price = document.getElementById("productPrice");

    if (price) {

        price.textContent = formatPrice(product.price);

    }

    // Old Price

    const oldPrice = document.getElementById("productOldPrice");

    if (oldPrice) {

        oldPrice.textContent = formatPrice(product.oldPrice);

    }

    // Rating

    const rating = document.getElementById("productRating");

    if (rating) {

        rating.innerHTML = `

            ${generateStars(product.rating)}

            <span>

                (${product.reviews} Reviews)

            </span>

        `;

    }

    // Description

    const description = document.getElementById("productDescription");

    if (description) {

        description.textContent = product.description;

    }

    // Stock

    const stock = document.getElementById("productStock");

    if (stock) {

        stock.textContent =

            product.stock > 0

            ? "In Stock"

            : "Out of Stock";

    }

    document.title = product.name + " | ElectroMart";

}

// ==========================================
// Product Not Found
// ==========================================

function showProductNotFound() {

    const container = document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML = `

        <div class="empty-products">

            <h2>Product Not Found</h2>

            <p>

                The requested product does not exist.

            </p>

            <a href="products.html"

                class="btn btn-primary">

                Back to Products

            </a>

        </div>

    `;

}

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadProduct();

});

/* ==========================================
   ElectroMart - product.js
   Part 2
========================================== */

// ==========================================
// Image Gallery
// ==========================================

function renderGallery() {

    if (!currentProduct) return;

    const gallery = document.getElementById("productGallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    currentProduct.images.forEach((image, index) => {

        gallery.innerHTML += `

            <img
                src="${image}"
                alt="${currentProduct.name}"
                class="gallery-image ${index === 0 ? "active" : ""}"
                onclick="changeProductImage('${image}', this)">

        `;

    });

}

// ==========================================
// Change Main Image
// ==========================================

function changeProductImage(image, element) {

    const mainImage = document.getElementById("productImage");

    if (mainImage) {

        mainImage.src = image;

    }

    document.querySelectorAll(".gallery-image").forEach(img => {

        img.classList.remove("active");

    });

    if (element) {

        element.classList.add("active");

    }

}

// ==========================================
// Quantity
// ==========================================

function updateQuantityDisplay() {

    const quantity = document.getElementById("quantity");

    if (quantity) {

        quantity.value = selectedQuantity;

    }

    updateSubtotal();

}

// ==========================================
// Increase Quantity
// ==========================================

function increaseQuantity() {

    if (!currentProduct) return;

    if (selectedQuantity >= currentProduct.stock) {

        showToast("Maximum stock reached");

        return;

    }

    selectedQuantity++;

    updateQuantityDisplay();

}

// ==========================================
// Decrease Quantity
// ==========================================

function decreaseQuantity() {

    if (selectedQuantity <= 1) {

        return;

    }

    selectedQuantity--;

    updateQuantityDisplay();

}

// ==========================================
// Manual Quantity Change
// ==========================================

function quantityChanged() {

    const input = document.getElementById("quantity");

    if (!input) return;

    let value = Number(input.value);

    if (isNaN(value) || value < 1) {

        value = 1;

    }

    if (value > currentProduct.stock) {

        value = currentProduct.stock;

    }

    selectedQuantity = value;

    input.value = value;

    updateSubtotal();

}

// ==========================================
// Subtotal
// ==========================================

function updateSubtotal() {

    const subtotal = document.getElementById("subtotal");

    if (!subtotal || !currentProduct) return;

    subtotal.textContent = formatPrice(

        currentProduct.price * selectedQuantity

    );

}

// ==========================================
// Discount
// ==========================================

function updateDiscount() {

    const discount = document.getElementById("discountAmount");

    if (!discount || !currentProduct) return;

    const value =

        (currentProduct.oldPrice - currentProduct.price)

        * selectedQuantity;

    discount.textContent = formatPrice(value);

}

// ==========================================
// Stock Status
// ==========================================

function updateStockStatus() {

    const stock = document.getElementById("productStock");

    if (!stock || !currentProduct) return;

    if (currentProduct.stock > 10) {

        stock.textContent = "In Stock";

        stock.className = "in-stock";

    }

    else if (currentProduct.stock > 0) {

        stock.textContent =

            `Only ${currentProduct.stock} Left`;

        stock.className = "low-stock";

    }

    else {

        stock.textContent = "Out of Stock";

        stock.className = "out-stock";

    }

}

// ==========================================
// Initialize Gallery
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!currentProduct) return;

    renderGallery();

    updateQuantityDisplay();

    updateDiscount();

    updateStockStatus();

});

/* ==========================================
   ElectroMart - product.js
   Part 3
========================================== */

// ==========================================
// Add To Cart
// ==========================================

function addCurrentProductToCart() {

    if (!currentProduct) return;

    const cart = getCart();

    const existing = cart.find(item => item.id === currentProduct.id);

    if (existing) {

        existing.quantity += selectedQuantity;

    } else {

        cart.push({
            id: currentProduct.id,
            quantity: selectedQuantity
        });

    }

    saveCart(cart);

    updateCartCount();

    showToast(`${currentProduct.name} added to cart`);

}

// ==========================================
// Buy Now
// ==========================================

function buyCurrentProduct() {

    addCurrentProductToCart();

    window.location.href = "checkout.html";

}

// ==========================================
// Wishlist
// ==========================================

function toggleCurrentWishlist() {

    if (!currentProduct) return;

    const wishlist = getWishlist();

    const exists = wishlist.find(

        item => item.id === currentProduct.id

    );

    const button = document.getElementById("wishlistButton");

    if (exists) {

        removeFromWishlist(currentProduct.id);

        if (button) {

            button.innerHTML = `

                <i class="fa-regular fa-heart"></i>

                Add to Wishlist

            `;

        }

        showToast("Removed from wishlist");

    } else {

        addToWishlist(currentProduct.id);

        if (button) {

            button.innerHTML = `

                <i class="fa-solid fa-heart"></i>

                Added to Wishlist

            `;

        }

    }

}

// ==========================================
// Update Wishlist Button
// ==========================================

function updateWishlistButton() {

    if (!currentProduct) return;

    const button = document.getElementById("wishlistButton");

    if (!button) return;

    const wishlist = getWishlist();

    const exists = wishlist.find(

        item => item.id === currentProduct.id

    );

    if (exists) {

        button.innerHTML = `

            <i class="fa-solid fa-heart"></i>

            Added to Wishlist

        `;

    } else {

        button.innerHTML = `

            <i class="fa-regular fa-heart"></i>

            Add to Wishlist

        `;

    }

}

// ==========================================
// Share Product
// ==========================================

function shareProduct() {

    if (!currentProduct) return;

    const url = window.location.href;

    if (navigator.share) {

        navigator.share({

            title: currentProduct.name,

            text: currentProduct.description,

            url: url

        });

    } else {

        navigator.clipboard.writeText(url);

        showToast("Product link copied");

    }

}

// ==========================================
// Save Recently Viewed
// ==========================================

function saveCurrentProduct() {

    let recent = getFromStorage("recentProducts");

    recent = recent.filter(id => id !== currentProduct.id);

    recent.unshift(currentProduct.id);

    recent = recent.slice(0, 8);

    saveToStorage("recentProducts", recent);

}

// ==========================================
// Product Availability
// ==========================================

function checkAvailability() {

    const status = document.getElementById("availability");

    if (!status || !currentProduct) return;

    if (currentProduct.stock > 0) {

        status.innerHTML = `

            <i class="fa-solid fa-circle-check"></i>

            Available

        `;

        status.className = "available";

    } else {

        status.innerHTML = `

            <i class="fa-solid fa-circle-xmark"></i>

            Out of Stock

        `;

        status.className = "not-available";

    }

}

// ==========================================
// Initialize Actions
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!currentProduct) return;

    updateWishlistButton();

    saveCurrentProduct();

    checkAvailability();

});

/* ==========================================
   ElectroMart - product.js
   Part 4
========================================== */

// ==========================================
// Related Products
// ==========================================

function loadRelatedProducts() {

    if (!currentProduct) return;

    const container = document.getElementById("relatedProducts");

    if (!container) return;

    container.innerHTML = "";

    const related = products.filter(product =>

        product.category === currentProduct.category &&
        product.id !== currentProduct.id

    );

    if (related.length === 0) {

        container.innerHTML = "<p>No related products found.</p>";

        return;

    }

    related.slice(0, 4).forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

// ==========================================
// Recently Viewed Products
// ==========================================

function loadRecentlyViewedProducts() {

    const container = document.getElementById("recentlyViewed");

    if (!container) return;

    const recent = getFromStorage("recentProducts");

    container.innerHTML = "";

    recent.forEach(id => {

        if (id === currentProduct.id) return;

        const product = findProduct(id);

        if (product) {

            container.innerHTML += createProductCard(product);

        }

    });

}

// ==========================================
// Product Specifications
// ==========================================

function loadSpecifications() {

    if (!currentProduct) return;

    const specs = document.getElementById("productSpecifications");

    if (!specs) return;

    specs.innerHTML = `

<table class="spec-table">

<tr>
<td>Brand</td>
<td>${currentProduct.brand}</td>
</tr>

<tr>
<td>Category</td>
<td>${currentProduct.category}</td>
</tr>

<tr>
<td>Price</td>
<td>${formatPrice(currentProduct.price)}</td>
</tr>

<tr>
<td>Rating</td>
<td>${currentProduct.rating} ⭐</td>
</tr>

<tr>
<td>Reviews</td>
<td>${currentProduct.reviews}</td>
</tr>

<tr>
<td>Stock</td>
<td>${currentProduct.stock}</td>
</tr>

<tr>
<td>Discount</td>
<td>${currentProduct.discount}%</td>
</tr>

</table>

`;

}

// ==========================================
// Product Highlights
// ==========================================

function loadHighlights() {

    const highlights = document.getElementById("productHighlights");

    if (!highlights || !currentProduct) return;

    highlights.innerHTML = `

<ul>

<li>✔ Premium Quality</li>

<li>✔ 1 Year Warranty</li>

<li>✔ Secure Payment</li>

<li>✔ Fast Delivery</li>

<li>✔ Easy Returns</li>

</ul>

`;

}

// ==========================================
// Recommended Products
// ==========================================

function loadRecommendedProducts() {

    const container = document.getElementById("recommendedProducts");

    if (!container) return;

    container.innerHTML = "";

    const recommended = [...products]

        .sort(() => Math.random() - 0.5)

        .slice(0, 4);

    recommended.forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

// ==========================================
// Product Breadcrumb
// ==========================================

function updateBreadcrumb() {

    const breadcrumb = document.getElementById("breadcrumbProduct");

    if (!breadcrumb || !currentProduct) return;

    breadcrumb.textContent = currentProduct.name;

}

// ==========================================
// Initialize Product Extras
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!currentProduct) return;

    updateBreadcrumb();

    loadSpecifications();

    loadHighlights();

    loadRelatedProducts();

    loadRecommendedProducts();

    loadRecentlyViewedProducts();

});

/* ==========================================
   ElectroMart - product.js
   Part 5 (Final)
========================================== */

// ==========================================
// Default Reviews
// ==========================================

const defaultReviews = [
    {
        name: "Rahul Sharma",
        rating: 5,
        date: "12 Jul 2026",
        comment: "Excellent product. Highly recommended!"
    },
    {
        name: "Priya Das",
        rating: 4,
        date: "08 Jul 2026",
        comment: "Good quality and fast delivery."
    },
    {
        name: "Amit Kumar",
        rating: 5,
        date: "03 Jul 2026",
        comment: "Worth every rupee."
    }
];

// ==========================================
// Render Reviews
// ==========================================

function loadReviews() {

    const container = document.getElementById("reviewsContainer");

    if (!container) return;

    container.innerHTML = "";

    defaultReviews.forEach(review => {

        container.innerHTML += `

<div class="review-card">

    <div class="review-header">

        <h4>${review.name}</h4>

        <small>${review.date}</small>

    </div>

    <div class="review-rating">

        ${generateStars(review.rating)}

    </div>

    <p>${review.comment}</p>

</div>

`;

    });

}

// ==========================================
// Rating Summary
// ==========================================

function updateRatingSummary() {

    const avg = document.getElementById("averageRating");

    const total = document.getElementById("totalReviews");

    if (avg) {

        avg.textContent = currentProduct.rating.toFixed(1);

    }

    if (total) {

        total.textContent = currentProduct.reviews;

    }

}

// ==========================================
// Review Form
// ==========================================

function submitReview(event) {

    event.preventDefault();

    const name = document.getElementById("reviewName");

    const rating = document.getElementById("reviewRating");

    const comment = document.getElementById("reviewComment");

    if (!name || !rating || !comment) return;

    if (
        name.value.trim() === "" ||
        comment.value.trim() === ""
    ) {

        showToast("Please fill all fields");

        return;

    }

    defaultReviews.unshift({

        name: name.value,

        rating: Number(rating.value),

        date: new Date().toLocaleDateString(),

        comment: comment.value

    });

    loadReviews();

    name.value = "";
    rating.value = "5";
    comment.value = "";

    showToast("Review submitted successfully");

}

// ==========================================
// Product Tabs
// ==========================================

function openTab(tabId) {

    document.querySelectorAll(".tab-content").forEach(tab => {

        tab.style.display = "none";

    });

    document.querySelectorAll(".tab-btn").forEach(btn => {

        btn.classList.remove("active");

    });

    const selectedTab = document.getElementById(tabId);

    if (selectedTab) {

        selectedTab.style.display = "block";

    }

    event.target.classList.add("active");

}

// ==========================================
// Image Zoom
// ==========================================

const productImage = document.getElementById("productImage");

if (productImage) {

    productImage.addEventListener("mousemove", () => {

        productImage.style.transform = "scale(1.3)";

    });

    productImage.addEventListener("mouseleave", () => {

        productImage.style.transform = "scale(1)";

    });

}

// ==========================================
// Keyboard Shortcut
// ==========================================

document.addEventListener("keydown", e => {

    if (e.key === "+") {

        increaseQuantity();

    }

    if (e.key === "-") {

        decreaseQuantity();

    }

});

// ==========================================
// Final Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!currentProduct) return;

    loadReviews();

    updateRatingSummary();

    console.log("Product Page Loaded Successfully");

});