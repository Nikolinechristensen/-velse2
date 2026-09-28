const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const product = document.querySelector("#product");

const backbutton = document.querySelector("#backbutton");
backbutton.addEventListener("click", () => history.back());

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(element) {
  console.log(element);
  {
    product.innerHTML = `
      <a class="link" href="productdetails.html?id=${element.id}">
      <article class="card-product">
     
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede">

      <div class="product-info">
      <h2>${element.productdisplayname}</h2>
      <h3>${element.articletype}</h3>
      <p>Mærke: ${element.category}</p>
      <p>Pris: ${element.price}</p>
      </div>

    </article>
    </a>
    `;
  }
}
