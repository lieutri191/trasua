document.addEventListener("DOMContentLoaded", () => {
    const productData = localStorage.getItem("selectedProduct");
    if (!productData) {
        document.getElementById("product-detail").innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
        return;
    }

    const product = JSON.parse(productData);
    const detailDiv = document.getElementById("product-detail");

    detailDiv.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" style="width: 250px;">
        <p>Giá: ${product.price.toLocaleString()} VND</p>
        <button id="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Thêm vào giỏ hàng</button>
    `;

    // Hàm hiển thị thông báo
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const messageSpan = document.getElementById('notification-message');

        messageSpan.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Ẩn thông báo sau 3 giây
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    window.addToCart = function(id) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showNotification("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    document.getElementById("add-to-cart").addEventListener("click", function() {
        addToCart(parseInt(this.dataset.id));
    });
});
