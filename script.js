const cat = new URLSearchParams(window.location.search).get("cat");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

const produktliste = document.querySelector(".produktliste");

function visData(data) {
  console.log(data);
  visantal.textContent = data.length;
  let markup = "";
  produktliste.innerHTML = "";
  data.forEach((element) => {
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    markup += `

    
      <a class="link ${element.soldout ? "udsolgt" : ""}" href=productdetails.html?id=${element.id}>
      <article class="card">
      
        ${element.soldout ? `<span class="udsolgt-label">UDSOLGT</span>` : ""}
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="produktbillede">

      <h2>${element.productdisplayname}</h2>
      <h3>${element.articletype}</h3>
      <p>${element.category}</p>
       ${
         element.discount
           ? `<p class='tilbudslabel'>-${element.discount}%</p> 
           <p>Før kr. ${element.price},- Nu ${tilbudspris},-</p>`
           : `<p>kr. ${element.price},-</p>`
       }

    </article>
    </a>`;
  });
  produktliste.innerHTML = markup;
}

const visantal = document.querySelector("#filtre span");

document.querySelectorAll("#filtre button").forEach((button) => button.addEventListener("click", filtrer));

let alleData, udsnit;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      alleData = udsnit = data;
      visData(data);
    });
}

function filtrer(e) {
  const valgt = e.target.textContent;
  if (valgt == "Alle") {
    visData(alleData);
  } else {
    const udsnit = alleData.filter((element) => element.gender == valgt);
    visData(udsnit);
  }
}

getData();

document.querySelectorAll("#sortering button").forEach((button) => button.addEventListener("click", sorter));

function sorter(e) {
  const valgt = e.target.textContent;
  if (valgt == "Pris lav-høj") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (valgt == "Pris høj-lav") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (valgt == "A-Z") {
    udsnit.sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  } else if (valgt == "Z-A") {
    udsnit.sort((a, b) => b.productdisplayname.localeCompare(a.productdisplayname));
  }
  visData(udsnit);
}
function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      alleData = data;
      udsnit = data;
      visData(data);
    });
}

getData();
