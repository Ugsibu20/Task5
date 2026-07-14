/* ==========================================
   ElectroMart - cart.js
========================================== */

const SHIPPING_CHARGE = 99;
const FREE_SHIPPING_LIMIT = 5000;
const GST_RATE = 0.18;

const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME15: 15,
    ELECTRO25: 25
};

let cart = getCart();
let discountAmount = 0;

const cartTable = document.getElementById("cartTable");
const emptyCart = document.getElementById("emptyCart");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grandTotal");
const clearCartBtn = document.getElementById("clearCart");
const applyCouponBtn = document.getElementById("applyCoupon");

function getSubtotal() {
    return cart.reduce((total, item) => {
        const product = findProduct(item.id);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function getShipping(subtotal) {
    return subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;
}

function getGST(amount) {
    return amount * GST_RATE;
}

function createCartRow(product, quantity) {
    return `
        <tr>
            <td>
                <div class="cart-product">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.brand}</p>
                    </div>
                </div>
            </td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <div class="cart-quantity">
                    <button type="button" onclick="decreaseQuantity(${product.id})">-</button>
                    <span>${quantity}</span>
                    <button type="button" onclick="increaseQuantity(${product.id})">+</button>
                </div>
            </td>
            <td>${formatPrice(product.price * quantity)}</td>
            <td>
                <button type="button" class="remove-btn" onclick="removeCartItem(${product.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

function renderCart() {
    cart = getCart().filter(item => findProduct(item.id) && item.quantity > 0);
    saveCart(cart);

    if (!cartTable) return;

    cartTable.innerHTML = cart
        .map(item => createCartRow(findProduct(item.id), item.quantity))
        .join("");

    if (emptyCart) {
        emptyCart.style.display = cart.length === 0 ? "block" : "none";
    }
}

function updateOrderSummary() {
    const subtotal = getSubtotal();
    const taxable = Math.max(subtotal - discountAmount, 0);
    const gst = getGST(taxable);
    const shipping = getShipping(subtotal);
    const total = taxable + gst + shipping;

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
    if (discountEl) discountEl.textContent = formatPrice(discountAmount);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);

    updateCartCount();
}

function refreshCart() {
    renderCart();
    updateOrderSummary();
    loadCartRecommendations();
}

function increaseQuantity(productId) {
    const item = cart.find(cartItem => cartItem.id == productId);
    const product = findProduct(productId);

    if (!item || !product) return;

    if (item.quantity >= product.stock) {
        showToast("Maximum stock reached");
        return;
    }

    item.quantity++;
    saveCart(cart);
    refreshCart();
}

function decreaseQuantity(productId) {
    const item = cart.find(cartItem => cartItem.id == productId);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id != productId);
    }

    saveCart(cart);
    refreshCart();
}

function removeCartItem(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCart(cart);
    refreshCart();
    showToast("Item removed");
}

function clearCart() {
    cart = [];
    discountAmount = 0;
    saveCart(cart);
    refreshCart();
    showToast("Cart cleared");
}

function applyCoupon() {
    const input = document.getElementById("couponCode");
    const code = input ? input.value.trim().toUpperCase() : "";
    const percent = coupons[code];

    if (!percent) {
        discountAmount = 0;
        updateOrderSummary();
        showToast("Invalid coupon");
        return;
    }

    discountAmount = getSubtotal() * (percent / 100);
    updateOrderSummary();
    showToast(`Coupon applied (${percent}% off)`);
}

function proceedToCheckout(event) {
    if (cart.length === 0) {
        event.preventDefault();
        showToast("Your cart is empty");
    }
}

function loadCartRecommendations() {
    const container = document.getElementById("recommendedProducts");

    if (!container) return;

    container.innerHTML = products
        .filter(product => !cart.some(item => item.id == product.id))
        .slice(0, 4)
        .map(createProductCard)
        .join("");
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
}

if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", applyCoupon);
}

document.querySelectorAll(".checkout-btn").forEach(button => {
    button.addEventListener("click", proceedToCheckout);
});

document.addEventListener("DOMContentLoaded", () => {
    refreshCart();
    console.log("Cart Page Loaded Successfully");
});
