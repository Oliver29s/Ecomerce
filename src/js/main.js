import { products } from "./data.js";

console.log(products);

let contenCard = document.querySelector(".content_card");
let iconCard = document.querySelector(".bxs-cart");
let containCards = document.querySelector(".contain_cards");
let objCarts = {}

iconCard.addEventListener("click", function () {
  contenCard.classList.toggle("content_card_click");
});

function prinProducts() {
  let html = "";
  products.forEach(({ id, name, image, category, stock, price }) => {
    html += `
                    <article class="card" >
                        <div class="product_img">
                            <img src="${image}" alt="${category}">
                        </div>
                        <div class="product_data" id="${id}">
                            <h2>$${price}.00 <span>| Stock:${stock}</span></h2></h2>
                            <h3>${name}</h3>
                            <button><i class='bx bx-message-square-add bx-max'></i></button>
                        </div>
                    </article>      

                 `;
    containCards.innerHTML = html;
  });
}
prinProducts();

containCards.addEventListener("click", function (e) {
  if (e.target.classList.contains("bx-max")) {
    let idAll = Number(e.target.parentElement.parentElement.id);
    let findCart = products.find(function (product) {
      return product.id === idAll;
    });
    if (objCarts[idAll]) {
        objCarts[idAll].amount++
    }else{
        objCarts[idAll] = {
            ...findCart,
            amount : 1
        }
    }
  } console.log(objCarts);
});
