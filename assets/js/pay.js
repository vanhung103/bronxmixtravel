document.addEventListener('DOMContentLoaded', () => {
    // Lấy đối tượng bảng từ trang HTML
let cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
let totalQuantityElement = document.getElementById('cartTotalQuantity');
let totalPriceElement = document.getElementById('cartTotalPrice');

// Hiển thị sản phẩm trong giỏ hàng dưới dạng bảng
function displayCartItems() {
    let storedCart = localStorage.getItem('shoppingCart');
    let cartItems = JSON.parse(storedCart) || [];

    // Xóa các hàng cũ trong bảng
    cartTable.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;
    

    // Hiển thị sản phẩm trong giỏ hàng
    cartItems.forEach((item, key) => {
        let row = cartTable.insertRow();
        let nameCell = row.insertCell(0);
        let imageCell = row.insertCell(1);
        let priceCell = row.insertCell(2);
        let quantityCell = row.insertCell(3);
        let totalCell = row.insertCell(4);
        let actionCell = row.insertCell(5);

        nameCell.innerText = item.name;
        imageCell.innerHTML = `<img src="image/${item.image}" alt="${item.name}" width="50">`;
        priceCell.innerText = '$' + item.price.toFixed(2);
        quantityCell.innerText = item.quantity;
        totalCell.innerText = '$' + (item.price * item.quantity).toFixed(2);

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        // Tạo nút để xóa sản phẩm
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.addEventListener('click', () => {
            removeProduct(key);
        });
        actionCell.appendChild(deleteButton);
    });

    // Hiển thị tổng số lượng và tổng giá trị giỏ hàng
    totalQuantityElement.innerText = totalQuantity;
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

    
// Gọi hàm hiển thị sản phẩm khi trang được tải
window.addEventListener('load', () => {
    displayCartItems();
});

// Thêm sự kiện cho nút Checkout nếu bạn muốn thực hiện các hành động khi người dùng nhấp vào nút đó
let checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        // Thực hiện các hành động khi người dùng nhấp vào nút Checkout
        // Ví dụ: chuyển hướng đến trang thanh toán hoặc hiển thị thông báo cảm ơn đã mua hàng
        alert('Thank you for your purchase!');
    });
} else {
    console.error("Element with id 'checkoutBtn' not found.");
}
});