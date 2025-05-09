document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Lưu trạng thái đăng nhập
            localStorage.setItem("loggedIn", JSON.stringify({ email: user.email }));
            showNotification("Đăng nhập thành công!", "success"); // Thông báo thành công
            setTimeout(() => {
                window.location.href = "index.html";  // Chuyển hướng đến trang chính
            }, 2000); // Đợi 2 giây để người dùng nhìn thấy thông báo
        } else {
            showNotification("Sai email hoặc mật khẩu.", "error"); // Thông báo lỗi
        }
    });
});

// Hàm hiển thị thông báo
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
