let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let xhr = new XMLHttpRequest();
const url = "https://magazinrabov-8869.restdb.io/rest";
xhr.open("GET", url + "/product");
// const api_key = "69343d7a1c64b93036dde62c";
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "69343d7a1c64b93036dde62c");
xhr.setRequestHeader("cache-control", "no-cache");
// const my_header = {
//   "Content-Type": "application/json",
//   "x-apikey": api_key,
//   cache_control: "no-cache",
// };

// fetch(url, {
//   method: "GET",
//   headers: my_header,
// }).then(async function (response) {
xhr.responseType = "json";
xhr.onload = function () {
  productsArray = xhr.response;
  productsGrid.innerHTML = null;
  productsArray.forEach((p) => {
    productsArray.push(p);
    let pElem = document.createElement("div");
    pElem.classList.add("product");
    pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class = 'product-photo' src="${p.photo_url}" alt='${p.name}'>
            <p class = 'product-price'><b>Price: </b>${p.price}</p>
            <p class = 'product-description'><b>Description: </b>${p.description}</p>
            <a href='User.html?id=${p.author_id}'>Seller profile</a>
            <button onclick="addProductToCart(${p._id})">Buy</button> 
            `;
    productsGrid.append(pElem);
  });
};
xhr.send();

let cartProd = document.getElementById("cart-products");

let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  drawCartProducts();
}

function addProductToCart(id) {
  let product = productsArray.find(function (p) {
    return p._id == id;
  });
  cart.push(product);
  drawCartProducts();
  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cart-button").classList.add("active");
  setTimeout(function () {
    document.getElementById("cart-button").classList.remove("active");
  }, 500);
}

function drawCartProducts() {
  if (cart.length === 0) return (cartProd.innerHTML = "Cart is empty");
  cartProd.innerHTML = null;
  let sum = 0;
  cart.forEach(function (p) {
    cartProd.innerHTML += `
            <p><img src="${p.photo_url}"> ${p.name} |${p.price}$</p>
            <hr>
        `;
    sum += p.price;
  });
  cartProd.innerHTML += `
        <p>Total Price: ${sum}$</p>
        <button onclick="buyAll()">Buy All</button>
    `;
}

function buyAll() {
  cart = [];
  cartProd.innerHTML = "Money was withdrawn from your credit card";
  localStorage.setItem("cart", "[]");
}

let orderBlock = document.getElementById("order-block");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function buyAll() {
  modal.style.display = "block";
  let sum = 0;
  orderBlock.innerHTML = null;
  cart.forEach(function (p) {
    orderBlock.innerHTML += `
    <div class="item>
      <img width = "100px" scr="${p.photo_url}">
      h2>${p.name} | ${p.price}</h2>
      </div>`;
    sum += p.price;
  });
  document.getElementById("price").innerText = sum + "$";
}

function openCart() {
  cartProd.classList.toggle("hide");
}

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let data = JSON.stringify({
    name: e.target["name"].value,
    address: e.target["address"].value,
    phone: e.target["phone"].value,
    post_number: e.target["post_number"].value,
    status: "New",
    products: localStorage.getItem("cart"),
  });

  // fetch("https://magazinrabov-8869.restdb.io/rest/orders", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //     "x-apikey": "	69343d7a1c64b93036dde62c",
  //     "cache-control": "no-cache",
  //   },
  //   body: data,
  // });
  // modal.style.display = "none";
  // cart = [];
  // cartProd.innerHTML = "Cart is empty";
  // localStorage.setItem("cart", "[]");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url + "/orders");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", "69343d7a1c64b93036dde62c");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.send(data);
  modal.style.display = "none";
  cart = [];
  cartProd.innerHTML = "Cart is empty";
  localStorage.setItem("cart", "[]");
});
