document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            showNotification("Mật khẩu và mật khẩu xác nhận không khớp.", "error");
            return;
        }

        // Kiểm tra xem email đã được sử dụng chưa
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            showNotification("Email này đã được đăng ký.", "error");
            return;
        }

        // Lưu thông tin người dùng
        const newUser = {
            fullname,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        showNotification("Đăng ký thành công!", "success");
        window.location.href = "login.html";
    });
});

// Hiển thị thông báo bên phải, dưới header
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageSpan = document.getElementById('notification-message');

    // Kiểm tra nếu notification tồn tại
    if (!notification) {
        console.error('Thông báo không tồn tại!');
        return;
    }

    // Đặt nội dung thông báo
    messageSpan.textContent = message;

    // Thêm lớp 'show' để hiển thị thông báo và thêm loại thông báo (error hoặc success)
    notification.classList.add('show');
    notification.classList.add(type);

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(function() {
        notification.classList.remove('show');
        notification.classList.remove(type);
    }, 5000); // Thời gian hiển thị thông báo (5 giây)
}

// Hàm đóng thông báo thủ công khi nhấn nút X
function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
}
