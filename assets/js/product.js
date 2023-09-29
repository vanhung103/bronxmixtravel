
// CART DEMO 
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Balo Cavalli 8869',
        image: '../assets/images/Balocavallib1.jpg',
        cost: 89.10,
        price: 50.12
    },
    {
        id: 2,
        name: 'Balo Mabel AB5186',
        image: '../assets/images/Balomabelb1.jpg',
        cost: 59.10,
        price: 25.02
    },
    {
        id: 3,
        name: 'Balo President P9179',
        image: '../assets/images/Balopresidentb2.jpg',
        cost: 112.05,
        price: 75.61
    },
    {
        id: 4,
        name: 'Balo Xenia BL118',
        image: '../assets/images/Baloxeniab4.jpg',
        cost: 65.01,
        price: 16.08
    },
    {
        id: 5,
        name: 'Vali Cooper PP20',
        image: '../assets/images/Valicoopera1.jpg',
        cost: 229.99,
        price: 92.16
    },
    {
        id: 6,
        name: 'Vali Veres AB1195',
        image: '../assets/images/Valiveresa1.jpg',
        cost: 78.70,
        price: 45.12
    },
    {
        id: 7,
        name: 'Vali Pagoda IT16-2371',
        image: '../assets/images/Valipagodaa1.jpg',
        cost: 357.05,
        price: 189.03
    },
    {
        id: 8,
        name: 'Vali Veres AB1195',
        image: '../assets/images/Valiwisataa1.jpg',
        cost: 83.01,
        price: 41.12
    }

];
let listCards  = [];

function isCartEmpty() {
    return listCards.every((product) => product === null);
  }
  

function initApp() {
  // Lấy các sản phẩm trong giỏ hàng từ Local Storage, nếu có
  const storedCart = localStorage.getItem('shoppingCart');
  if (storedCart) {
    listCards = JSON.parse(storedCart);
  }

//   <img src="image/${value.image}">
//       <div class="title">${value.name}</div>
//       <div class="price">${value.price.toLocaleString()}</div>
//       <button class="addtocard" onclick="addToCard(${key})">Thêm vào giỏ hàng</button>

  products.forEach((value, key) => {
    if (value && value.name && value.image && value.price) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('shop-card');
    newDiv.innerHTML = `
      <div
        class="card-banner img-holder"
        style="--width: 540; --height: 720"
      >
        <img
          src="image/${value.image}"
          width="540"
          height="720"
          loading="lazy"
          alt="Facial cleanser"
          class="img-cover"
        />

        <span class="badge" aria-label="20% off">-20%</span>

        <div class="card-actions">
          <button class="action-btn addtocard" onclick="addToCard(${key})" aria-label="add to cart">
            <ion-icon
              name="bag-handle-outline"
              aria-hidden="true"
            ></ion-icon>
          </button>

          <button class="action-btn" aria-label="add to whishlist">
            <ion-icon
              name="star-outline"
              aria-hidden="true"
            ></ion-icon>
          </button>

          <button class="action-btn" aria-label="compare">
            <ion-icon
              name="repeat-outline"
              aria-hidden="true"
            ></ion-icon>
          </button>
        </div>
      </div>

      <div class="card-content">
        <div class="price">
          <del class="del">${value.cost.toLocaleString()}</del>

          <span class="span">${value.price.toLocaleString()}</span>
        </div>

        <h3>
          <a href="#" class="card-title">${value.name}</a>
        </h3>

        <div class="card-rating">
          <div class="rating-wrapper" aria-label="5 start rating">
            <ion-icon name="star" aria-hidden="true"></ion-icon>
            <ion-icon name="star" aria-hidden="true"></ion-icon>
            <ion-icon name="star" aria-hidden="true"></ion-icon>
            <ion-icon name="star" aria-hidden="true"></ion-icon>
            <ion-icon name="star" aria-hidden="true"></ion-icon>
          </div>

          <p class="rating-text">2000 reviews</p>
        </div>
      </div>
`;
    list.appendChild(newDiv);
  }
  else {
    console.error(`Invalid product data for product at index ${key}`);
  }});
  updateCartQuantityIcon();
}

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity++;
  }

  // Lưu giỏ hàng vào Local Storage
  saveCartToLocalStorage();
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price;
      count += value.quantity;

      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="image/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div>
          <button class"changeQuantity" onclick="changeQuantity(${key}, ${value.quantity - 1})"><ion-icon name="remove-outline"></ion-icon></button>
          <div class="count">${value.quantity}</div>
          <button class"changeQuantity" onclick="changeQuantity(${key}, ${value.quantity + 1})"><ion-icon name="add-outline"></ion-icon></button>
          <button class="remove" onclick="removeProduct(${key})"><ion-icon name="trash-outline"></ion-icon></button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity <= 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }

  // Lưu giỏ hàng vào Local Storage
  saveCartToLocalStorage();
  reloadCard();
}

function removeProduct(key) {
  delete listCards[key];

  // Lưu giỏ hàng vào Local Storage sau khi xóa sản phẩm
  saveCartToLocalStorage();
  reloadCard();
}

function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(listCards));
}
// Tạo hàm để cập nhật số lượng sản phẩm từ Local Storage và hiển thị lên trang
function updateCartQuantityIcon() {
    let totalQuantity = 0;

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  listCards.forEach((product) => {
    if (product != null) {
      totalQuantity += product.quantity;
    }
  });

  // Hiển thị tổng số lượng sản phẩm trong biểu tượng số lượng giỏ hàng
  quantity.innerText = totalQuantity;

  // Thêm lớp 'active' vào thẻ body nếu giỏ hàng không trống
  }
  // Gọi hàm cập nhật số lượng sản phẩm và hiển thị giỏ hàng khi trang được tải lại
  window.addEventListener('load', () => {
    updateCartQuantityIcon();
    reloadCard();
  });

  // Gọi hàm cập nhật số lượng sản phẩm khi trang mất focus
window.addEventListener('blur', () => {
    updateCartQuantityIcon();
  });

initApp();