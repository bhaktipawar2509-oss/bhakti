// 3 products with images
const products = [
  { name: "Laptop", price: 1200, desc: "High-performance laptop", img: "laptop.jpg" },
  { name: "Phone", price: 800, desc: "Latest smartphone", img: "phone.jpg" },
  { name: "Computer", price: 200, desc: "Smart watch", img: "computer.jpg" },
  { name: "Earbuds", price: 1200, desc: "Wireless Convenience", img: "earbuds.jpg" },
  { name: "Printer", price: 800, desc: "Latest smartphone", img: "printer.jpg" },
  { name: "Polaroid", price: 1000, desc: "Instant camera", img: "polaroid.jpg" },
  { name: "Speaker", price: 400, desc: "Very good, very informative", img: "speaker.jpg" },
  { name: "Scientific calculator", price: 250, desc: "Good in use", img: "calculator.jpg" },
  { name: "Scanner", price: 1200, desc: "High-performance", img: "scanner.jpg" },
  { name: "Keyboard", price: 800, desc: "High-performance", img: "keyboard.jpg" },
    { name: "Mouse", price: 800, desc: "Latest smartphone", img: "mouse.jpg" },
  { name: "Smart watch", price: 200, desc: "Smart watch", img: "swatch.jpg" }
];

// Background images
const homeBackgrounds = ["home1.jpg", "home2.jpg"];
const productBackgrounds = ["product1.jpg", "product2.jpg"];

// Set random background
function setRandomBackground() {
  const body = document.body;
  if (body.classList.contains("home")) {
    const img = homeBackgrounds[Math.floor(Math.random() * homeBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  } else if (body.classList.contains("product")) {
    const img = productBackgrounds[Math.floor(Math.random() * productBackgrounds.length)];
    body.style.background = `url('${img}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
  }
}

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart() {
  const name = localStorage.getItem("productName");
  const price = localStorage.getItem("productPrice");
  const img = localStorage.getItem("productImg");

  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert(`${name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
  const count = cart.length;
  document.getElementById("cartCount").innerText = count;
}

// Show cart items
function displayCart() {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" width="50">
      <span>${item.name} - $${item.price}</span>
    `;
    cartContainer.appendChild(div);
  });
}

// On load
window.onload = function () {
  setRandomBackground();
  displayProducts();
  loadProductDetails();
  enableSearch();
  updateCartCount(); // ✅ show cart count immediately
  displayCart(); // if cart page exists
};


// Display products on home page
function displayProducts() {
  const container = document.querySelector(".products");
  if (!container) return;
  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `;
    div.onclick = () => showProduct(product.name, product.price, product.desc, product.img);
    container.appendChild(div);
  });
}



// Save product details and navigate to product page
function showProduct(name, price, desc, img) {
  localStorage.setItem('productName', name);
  localStorage.setItem('productPrice', price);
  localStorage.setItem('productDesc', desc);
  localStorage.setItem('productImg', img);
  window.location.href = 'product.html';
}

// Load product details on product page
function loadProductDetails() {
  if (document.getElementById('productName')) {
    document.getElementById('productName').innerText = localStorage.getItem('productName');
    document.getElementById('productPrice').innerText = 'Price: $' + localStorage.getItem('productPrice');
    document.getElementById('productDesc').innerText = 'Description: ' + localStorage.getItem('productDesc');

    const imgSrc = localStorage.getItem('productImg');
    if (imgSrc) {
      let imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = localStorage.getItem('productName');
      imgElement.className = "detail-img";
      document.body.insertBefore(imgElement, document.getElementById('productName').nextSibling);
    }
  }
}

// Go back to home
function goBack() {
  window.location.href = 'index.html';
}


// Search filter
function enableSearch() {
  const searchBar = document.getElementById("searchBar");
  if (!searchBar) return;

  searchBar.addEventListener("keyup", e => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll(".product").forEach(product => {
      const productName = product.querySelector("h3").textContent.toLowerCase();
      product.style.display = productName.includes(searchText) ? "block" : "none";
    });
  });
}

// On page load
window.onload = function() {
  setRandomBackground();
  displayProducts();
  loadProductDetails();
  enableSearch(); // ✅ Call the search function here
  updateCartCount();  // ✅ show cart count immediately
  displayCart();      // ✅ if cart page exists
};
