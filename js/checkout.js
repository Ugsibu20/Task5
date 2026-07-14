/* ==========================================
   ElectroMart - checkout.js
========================================== */

const SHIPPING_CHARGE = 99;
const FREE_SHIPPING_LIMIT = 5000;
const GST_RATE = 0.18;

let checkoutCart = getCart();

const checkoutItems = document.getElementById("checkoutItems");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grandTotal");
const placeOrderBtn = document.getElementById("placeOrder");

function getCheckoutSubtotal() {
    return checkoutCart.reduce((total, item) => {
        const product = findProduct(item.id);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

function getCheckoutShipping(subtotal) {
    return subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;
}

function getCheckoutGST(amount) {
    return amount * GST_RATE;
}

function renderCheckoutItems() {
    if (!checkoutItems) return;

    checkoutItems.innerHTML = checkoutCart.map(item => {
        const product = findProduct(item.id);

        if (!product) return "";

        return `
            <div class="checkout-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="checkout-info">
                    <h4>${product.name}</h4>
                    <p>${product.brand}</p>
                    <small>Quantity: ${item.quantity}</small>
                </div>
                <div class="checkout-price">${formatPrice(product.price * item.quantity)}</div>
            </div>
        `;
    }).join("");
}

function updateCheckoutSummary() {
    const subtotal = getCheckoutSubtotal();
    const shipping = getCheckoutShipping(subtotal);
    const gst = getCheckoutGST(subtotal);
    const total = subtotal + shipping + gst;

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
    if (discountEl) discountEl.textContent = formatPrice(0);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);
}

function loadCustomerDetails() {
    const customer = getFromStorage("customerDetails");

    if (!customer || Array.isArray(customer)) return;

    const mappings = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode
    };

    Object.entries(mappings).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input && value) input.value = value;
    });
}

function saveCustomerDetails() {
    const customer = {
        name: document.getElementById("name")?.value.trim() || "",
        email: document.getElementById("email")?.value.trim() || "",
        phone: document.getElementById("phone")?.value.trim() || "",
        address: document.getElementById("address")?.value.trim() || "",
        city: document.getElementById("city")?.value.trim() || "",
        state: document.getElementById("state")?.value.trim() || "",
        pincode: document.getElementById("pincode")?.value.trim() || "",
        country: "India"
    };

    saveToStorage("customerDetails", customer);

    return customer;
}

function validateCheckoutForm() {
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "pincode"];
    const missingField = requiredFields.find(id => !document.getElementById(id)?.value.trim());

    if (missingField) {
        showToast("Please complete all billing details");
        document.getElementById(missingField)?.focus();
        return false;
    }

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Enter a valid email");
        return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        showToast("Enter a valid 10-digit mobile number");
        return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
        showToast("Enter a valid 6-digit pincode");
        return false;
    }

    return true;
}

function getSelectedPaymentMethod() {
    const selected = document.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : "card";
}

function generateOrderId() {
    return `EM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function generateTrackingNumber() {
    return `TRK${Math.floor(100000000 + Math.random() * 900000000)}`;
}

function createCheckoutData(customer) {
    const subtotal = getCheckoutSubtotal();
    const shipping = getCheckoutShipping(subtotal);
    const gst = getCheckoutGST(subtotal);
    const total = subtotal + shipping + gst;

    return {
        items: checkoutCart,
        subtotal,
        shipping,
        gst,
        total,
        paymentMethod: getSelectedPaymentMethod(),
        customer,
        orderDate: new Date().toISOString()
    };
}

function saveOrder(checkoutData) {
    const order = {
        orderId: generateOrderId(),
        trackingNumber: generateTrackingNumber(),
        status: "Pending Payment",
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString(),
        ...checkoutData
    };

    const orders = getFromStorage("orders");
    const orderList = Array.isArray(orders) ? orders : [];

    orderList.unshift(order);
    saveToStorage("orders", orderList);
    saveToStorage("currentOrder", order);
}

function placeOrder() {
    checkoutCart = getCart().filter(item => findProduct(item.id) && item.quantity > 0);

    if (checkoutCart.length === 0) {
        showToast("Your cart is empty");
        window.location.href = "cart.html";
        return;
    }

    if (!validateCheckoutForm()) return;

    const customer = saveCustomerDetails();
    const checkoutData = createCheckoutData(customer);

    saveToStorage("checkoutData", checkoutData);
    saveOrder(checkoutData);

    window.location.href = "payment.html";
}

function loadCheckout() {
    checkoutCart = getCart().filter(item => findProduct(item.id) && item.quantity > 0);
    saveCart(checkoutCart);

    if (checkoutCart.length === 0) {
        window.location.href = "cart.html";
        return;
    }

    renderCheckoutItems();
    updateCheckoutSummary();
    loadCustomerDetails();
    updateCartCount();
}

if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", placeOrder);
}

document.addEventListener("DOMContentLoaded", () => {
    loadCheckout();
    console.log("Checkout Page Loaded Successfully");
});
