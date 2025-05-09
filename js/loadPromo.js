document.addEventListener("DOMContentLoaded", () => {
    // Tạo thẻ div chứa popup
    const popup = document.createElement("div");
    popup.id = "promo-popup";
    popup.style.display = "none"; // Ẩn ban đầu
    document.body.appendChild(popup);
  
    // Tải nội dung từ promo.html
    fetch("promo.html")
      .then(response => response.text())
      .then(data => {
        popup.innerHTML = data;
        popup.style.display = "flex"; // Hiện popup sau khi tải xong nội dung
      })
      .catch(error => console.error("Lỗi tải khuyến mãi:", error));
  });
  
  // Hàm đóng popup, được gọi khi click nút ×
  function closePromo() {
    const popup = document.getElementById("promo-popup");
    if (popup) popup.style.display = "none";
  }
  