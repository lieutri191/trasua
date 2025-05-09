document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutBtn = document.getElementById("logout-btn");
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');

    // Hiển thị/ẩn link đăng nhập, đăng ký, giỏ hàng
    if (loggedInUser) {
        loginLink && (loginLink.style.display = "none");
        registerLink && (registerLink.style.display = "none");
        logoutBtn && (logoutBtn.style.display = "inline-block");
    } else {
        logoutBtn && (logoutBtn.style.display = "none");
        cartLinks.forEach(link => link.style.display = "none"); // Ẩn tất cả link đến giỏ hàng
    }

    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.reload();
    });

    // Dưới đây là phần hiện sản phẩm như cũ
    const productList = document.getElementById('products');

    if (typeof products !== 'undefined' && productList) {
        products.forEach(p => {
            const item = document.createElement('div');
            item.className = 'product';
            item.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Giá: ${p.price.toLocaleString()} VND</p>
                <button onclick="viewDetail(${p.id})">Xem chi tiết</button>
                <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
            `;
            productList.appendChild(item);
        });
    }

    window.viewDetail = function(id) {
        const product = products.find(p => p.id === id);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "detail.html";
    };

    window.addToCart = function(id) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
        if (!loggedInUser) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            window.location.href = "login.html";
            return;
        }

        const product = products.find(p => p.id === id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };
});
function showToast(message, type = "success") {
    const notification = document.getElementById("notification");
    const messageSpan = document.getElementById("notification-message");

    if (!notification || !messageSpan) return;

    messageSpan.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.className = "notification";
        notification.style.display = "none";
    }, 3000);

    // Đảm bảo hiển thị lại nếu vừa bị ẩn
    notification.style.display = "block";
}

