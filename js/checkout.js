document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsSummary = document.getElementById("cart-items-summary");
    const totalPriceSummary = document.getElementById("total-price-summary");

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn hiện tại trống.");
        window.location.href = "cart.html";
    }

    let totalPrice = 0;

    // Hiển thị các sản phẩm trong giỏ hàng
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p>Số lượng: ${item.quantity}</p>
            <p>Giá: ${item.price.toLocaleString()} VND</p>
        `;
        cartItemsSummary.appendChild(itemDiv);

        // Tính tổng tiền
        totalPrice += item.price * item.quantity;
    });

    // Hiển thị tổng tiền
    totalPriceSummary.textContent = `${totalPrice.toLocaleString()} VND`;

    // Xử lý thanh toán
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;

        if (name && address && phone) {
            // Lưu thông tin đơn hàng vào localStorage hoặc gửi đến server ở đây
            alert("Thanh toán thành công! Chúng tôi sẽ giao hàng đến bạn sớm.");
            localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi thanh toán
            window.location.href = "index.html";
        } else {
            alert("Vui lòng điền đầy đủ thông tin.");
        }
    });
});
