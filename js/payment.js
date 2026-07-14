/* ==========================================
   ElectroMart - payment.js
========================================== */

let checkoutData = getFromStorage("checkoutData");
let currentOrder = getFromStorage("currentOrder");

const paymentItems = document.getElementById("paymentItems");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.querySelector(".payment-summary .summary-item:nth-of-type(2) span:last-child");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grandTotal");
const payNowBtn = document.getElementById("payNow");
const cardPayment = document.getElementById("cardPayment");
const upiPayment = document.getElementById("upiPayment");
const codPayment = document.getElementById("codPayment");

function hasCheckoutData() {
    return checkoutData && !Array.isArray(checkoutData) && checkoutData.items;
}

function renderPaymentItems() {
    if (!paymentItems || !hasCheckoutData()) return;

    paymentItems.innerHTML = checkoutData.items.map(item => {
        const product = findProduct(item.id);

        if (!product) return "";

        return `
            <div class="payment-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="payment-info">
                    <h4>${product.name}</h4>
                    <p>${product.brand}</p>
                    <small>Quantity: ${item.quantity}</small>
                </div>
                <div class="payment-price">${formatPrice(product.price * item.quantity)}</div>
            </div>
        `;
    }).join("");
}

function updatePaymentSummary() {
    if (!hasCheckoutData()) return;

    if (subtotalEl) subtotalEl.textContent = formatPrice(checkoutData.subtotal);
    if (shippingEl) shippingEl.textContent = checkoutData.shipping === 0 ? "FREE" : formatPrice(checkoutData.shipping);
    if (discountEl) discountEl.textContent = formatPrice(0);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(checkoutData.total);
}

function getSelectedPaymentMethod() {
    const selected = document.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : checkoutData.paymentMethod || "card";
}

function updatePaymentPanels() {
    const method = getSelectedPaymentMethod();

    if (cardPayment) cardPayment.style.display = method === "card" ? "block" : "none";
    if (upiPayment) upiPayment.style.display = method === "upi" ? "block" : "none";
    if (codPayment) codPayment.style.display = method === "cod" ? "block" : "none";

    if (hasCheckoutData()) {
        checkoutData.paymentMethod = method;
        saveToStorage("checkoutData", checkoutData);
    }
}

function validatePaymentForm() {
    const method = getSelectedPaymentMethod();

    if (method === "cod") return true;

    if (method === "upi") {
        const upiId = document.getElementById("upiId")?.value.trim() || "";

        if (!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
            showToast("Enter a valid UPI ID");
            return false;
        }

        return true;
    }

    const cardName = document.getElementById("cardName")?.value.trim() || "";
    const cardNumber = document.getElementById("cardNumber")?.value.replace(/\s/g, "") || "";
    const expiry = document.getElementById("expiry")?.value.trim() || "";
    const cvv = document.getElementById("cvv")?.value.trim() || "";

    if (cardName.length < 3) {
        showToast("Enter card holder name");
        return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        showToast("Card number must contain 16 digits");
        return false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        showToast("Enter expiry as MM/YY");
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        showToast("CVV must contain 3 digits");
        return false;
    }

    return true;
}

function generateTransactionId() {
    return `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function finishPayment() {
    if (!hasCheckoutData() || !currentOrder || Array.isArray(currentOrder)) {
        window.location.href = "checkout.html";
        return;
    }

    if (!validatePaymentForm()) return;

    const transactionId = generateTransactionId();
    const method = getSelectedPaymentMethod();
    const paymentDetails = {
        transactionId,
        orderId: currentOrder.orderId,
        paymentMethod: method,
        amount: checkoutData.total,
        paymentDate: new Date().toLocaleString(),
        status: method === "cod" ? "Cash on Delivery" : "Success"
    };

    currentOrder.status = method === "cod" ? "Confirmed" : "Paid";
    currentOrder.paymentMethod = method;
    currentOrder.transactionId = transactionId;
    currentOrder.paymentDate = paymentDetails.paymentDate;

    const orders = getFromStorage("orders");
    const orderList = Array.isArray(orders) ? orders : [];
    const updatedOrders = orderList.map(order =>
        order.orderId === currentOrder.orderId ? currentOrder : order
    );

    saveToStorage("orders", updatedOrders);
    saveToStorage("currentOrder", currentOrder);
    saveToStorage("paymentDetails", paymentDetails);
    saveCart([]);
    localStorage.removeItem("checkoutData");
    updateCartCount();

    showToast("Order placed successfully");

    setTimeout(() => {
        window.location.href = "success.html";
    }, 700);
}

function loadPaymentPage() {
    checkoutData = getFromStorage("checkoutData");
    currentOrder = getFromStorage("currentOrder");

    if (!hasCheckoutData() || !currentOrder || Array.isArray(currentOrder)) {
        window.location.href = "checkout.html";
        return;
    }

    renderPaymentItems();
    updatePaymentSummary();
    updatePaymentPanels();
}

document.querySelectorAll('input[name="payment"]').forEach(input => {
    input.addEventListener("change", updatePaymentPanels);
});

if (payNowBtn) {
    payNowBtn.addEventListener("click", finishPayment);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPaymentPage();
    console.log("Payment Page Loaded Successfully");
});
