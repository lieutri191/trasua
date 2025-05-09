document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Giỏ hàng của bạn hiện tại trống.</p>";
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Giá: ${item.price.toLocaleString()} VND</p>
            </div>
            <div class="cart-item-right">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-text">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;
});

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => {
        if (item.id === productId) {
            const newQuantity = item.quantity + change;
            item.quantity = newQuantity < 1 ? 1 : newQuantity;
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn hiện tại trống.");
        return;
    }
    window.location.href = "checkout.html";
}
