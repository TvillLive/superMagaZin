let productsGrid = document.getElementById("products-grid");
let productsArray = [];
const url = "https://magazinrabov-8869.restdb.io/rest/product";
const api_key = "69343d7a1c64b93036dde62c";

const my_headers = {
  "content-type": "application/json",
  "x-apikey": api_key,
  "cache-control": "no-cache",
};
fetch(url, {
  method: "GET",
  headers: my_headers,
}).then(async function (response) {
  const result = await response.json();
  productsArray = xhr.response;
  productsGrid.innerHTML = null;
  productsArray.forEach((p) => {
    productsArray.push(p);
    let pElem = document.createElement("div");
    pElem.classList.add("product");
    pElem.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class = 'product-photo' src="${p.photo - url}" alt='${
      p.photo
    }'>
            <p class = 'product-price'><b>Price: </b>${p.price}</p>
            <p class = 'product-description'><b>Description: </b>${
              p.description
            }</p>
            <a href='User.html?id=${p.author_id}'>Seller profile</a>
            <button onclick="addProductToCart(${p.id})">Buy</button> 
            `;
    productsGrid.append(pElem);
  });
});
