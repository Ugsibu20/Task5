/* ==========================================
   ElectroMart - main.js
   Part 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================
   Initialize Application
========================================== */

function initializeApp() {

    updateCartCount();
    updateWishlistCount();

    initializeBackToTop();
    initializeNavbar();
    initializeMobileMenu();

}

/* ==========================================
   Sticky Navbar
========================================== */

function initializeNavbar() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}

/* ==========================================
   Mobile Menu
========================================== */

function initializeMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".menu");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}

/* ==========================================
   Back To Top Button
========================================== */

function initializeBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* ==========================================
   Smooth Scroll for Anchor Links
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ==========================================
   Active Navigation Link
========================================== */

(function () {

    const page = location.pathname.split("/").pop();

    document.querySelectorAll(".menu a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === page || (page === "" && href === "index.html")) {

            link.classList.add("active");

        }

    });

})();

/* ==========================================
   Header Search
========================================== */

const headerSearch = document.getElementById("searchInput") || document.querySelector(".search-box input");
const headerSearchBtn = document.getElementById("searchBtn") || document.querySelector(".search-box button");

function submitHeaderSearch() {
    if (!headerSearch) return;

    const keyword = headerSearch.value.trim();

    if (!keyword) return;

    localStorage.setItem("searchKeyword", keyword);

    window.location.href = `products.html?search=${encodeURIComponent(keyword)}`;
}

if (headerSearch) {

    headerSearch.addEventListener("keydown", function (e) {

        if (e.key === "Enter") submitHeaderSearch();

    });

}

if (headerSearchBtn) {

    headerSearchBtn.addEventListener("click", (event) => {

        event.preventDefault();

        submitHeaderSearch();

    });

}


/* ==========================================
   Newsletter Form
========================================== */

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("newsletterEmail").value.trim();

        if (!email) {

            showToast("Please enter your email");

            return;

        }

        localStorage.setItem("newsletterEmail", email);

        showToast("Thank you for subscribing!");

        this.reset();

    });

}

const newsletterBox = document.querySelector(".newsletter-box");

if (newsletterBox && !newsletterForm) {

    const emailInput = newsletterBox.querySelector('input[type="email"]');
    const subscribeBtn = newsletterBox.querySelector("button");

    if (emailInput && subscribeBtn) {

        subscribeBtn.addEventListener("click", () => {

            const email = emailInput.value.trim();

            if (!email) {

                showToast("Please enter your email");

                return;

            }

            localStorage.setItem("newsletterEmail", email);

            showToast("Thank you for subscribing!");

            emailInput.value = "";

        });

    }

}

/* ==========================================
   Quick View Modal
========================================== */

const modal = document.getElementById("quickViewModal");
const modalContent = document.getElementById("quickViewContent");
const closeModal = document.getElementById("closeModal");

function openQuickView(productId) {

    if (!modal || !modalContent) return;

    const product = findProduct(productId);

    if (!product) return;

    modalContent.innerHTML = `

        <div class="modal-product">

            <div class="modal-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="modal-info">

                <h2>${product.name}</h2>

                <p>${product.description}</p>

                <div class="rating">

                    ${generateStars(product.rating)}

                    <span>(${product.reviews} Reviews)</span>

                </div>

                <h3>${formatPrice(product.price)}</h3>

                <button class="btn btn-primary"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </div>

    `;

    modal.style.display = "flex";

}

function quickView(productId) {

    openQuickView(productId);

}

function renderHomeProducts() {

    const featuredContainer = document.getElementById("featuredProducts");
    const trendingContainer = document.getElementById("trendingProducts");

    if (featuredContainer && window.products) {

        featuredContainer.innerHTML = products
            .filter(product => product.featured)
            .slice(0, 8)
            .map(createProductCard)
            .join("");

    }

    if (trendingContainer && window.products) {

        trendingContainer.innerHTML = products
            .filter(product => product.bestseller)
            .slice(0, 8)
            .map(createProductCard)
            .join("");

    }

}

document.addEventListener("DOMContentLoaded", renderHomeProducts);

if (closeModal) {

    closeModal.addEventListener("click", () => {

        modal.style.display = "none";

    });

}

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

/* ==========================================
   Page Fade Animation
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
   Keyboard Shortcut
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (modal) {

            modal.style.display = "none";

        }

    }

});

/* ==========================================
   Loader Helpers
========================================== */

function showLoader() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "block";

    }

}

function hideLoader() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

}

/* ==========================================
   Page Transition
========================================== */

document.querySelectorAll("a").forEach(link => {

    if (link.target === "_blank") return;

    if (link.href.includes("#")) return;

    link.addEventListener("click", () => {

        document.body.classList.add("page-leaving");

    });

});

/* ==========================================
   Scroll Reveal
========================================== */

const revealItems = document.querySelectorAll(

    ".product-card, .feature-card, .category-card"

);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => observer.observe(item));

/* ==========================================
   Window Resize
========================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        const menu = document.querySelector(".menu");

        if (menu) {

            menu.classList.remove("show");

        }

    }

});



/* ==========================================
   Initialize Saved Search
========================================== */

(function () {

    const keyword = localStorage.getItem("searchKeyword");

    if (!keyword) return;

    const searchBox = document.getElementById("productSearch");

    if (searchBox) {

        searchBox.value = keyword;

    }

})();

/* ==========================================
   Initialize Cart & Wishlist
========================================== */

(function () {

    if (!localStorage.getItem("cart")) {

        saveCart([]);

    }

    if (!localStorage.getItem("wishlist")) {

        saveWishlist([]);

    }

    updateCartCount();

    updateWishlistCount();

})();

/* ==========================================
   Footer Copyright Year
========================================== */

(function () {

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

})();

/* ==========================================
   Button Ripple Effect
========================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;

        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================================
   Lazy Loading Images
========================================== */

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const img = entry.target;

            img.src = img.dataset.src;

            img.removeAttribute("data-src");

            observer.unobserve(img);

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}

/* ==========================================
   Online / Offline Status
========================================== */

window.addEventListener("online", () => {

    showToast("Internet Connected");

});

window.addEventListener("offline", () => {

    showToast("No Internet Connection");

});

/* ==========================================
   Prevent Form Resubmission
========================================== */

if (window.history.replaceState) {

    window.history.replaceState(

        null,

        null,

        window.location.href

    );

}

/* ==========================================
   Console Welcome
========================================== */

console.log(

`
=====================================
⚡ ElectroMart
Professional E-Commerce Website
HTML • CSS • JavaScript
=====================================
`
);

/* ==========================================
   Global Error Handler
========================================== */

window.addEventListener("error", (event) => {

    console.error("Error:", event.message);

});

/* ==========================================
   Final Startup
========================================== */

window.addEventListener("load", () => {

    hideLoader();

    updateCartCount();

    updateWishlistCount();

    console.log("ElectroMart Loaded Successfully");

});
