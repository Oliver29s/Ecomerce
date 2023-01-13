import { products } from "./data.js";

console.log(products);

let contenCard = document.querySelector(".content_card");
let iconCard = document.querySelector(".bxs-cart");
let containCards = document.querySelector(".contain_cards");
let carProducts = document.querySelector('.car_products')
let cartTotal = document.querySelector('.cart_total')
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


function printCartProducts(){
  let html =''
  let newObj = Object.values(objCarts)
  newObj.forEach(function({ id, name, image, category, amount, price }){
   html += `
    <article class="ca" >
        <div class="product_img">
            <img src="${image}" alt="${category}">
        </div>
        <div class="product_data" id="${id}">
            <h2>$${price}.00 <span>| Cant:${amount}</span>
            <h3>${name}</h3>
            <h4>Subtotal: ${price * amount}.00</h4>
            <div class="cart_buttom">
            <i class='bx bx-plus buttom_icon'></i>
            <i class='bx bx-trash buttom_icon'></i>
            <i class='bx bx-minus buttom_icon'></i>
            </div>
        </div>
    </article>      
 `
  })
  carProducts.innerHTML= html 
}

function printCartTotal(){
  let cartArray = Object.values(objCarts)
    if(cartArray.length == 0){
      cartTotal.innerHTML =`
      <div class="cart_add">
                <h3>Hello, there is nothing in the shopping cart.</h3>
            </div>
      `
      return
    }

    let sum = 0
    cartArray.forEach(function({amount,price}) {
      sum += amount * price
    })
    cartTotal.innerHTML = `
    <div class="cart_total2">
                <h3>Total to pay is: ${sum}.00</h3>
              <button class="button_total2">Buy</button>
            </div>
    `
  
}

 printCartTotal()

containCards.addEventListener("click", function (e) {
  if (e.target.classList.contains("bx-max")) {
    let idAll = Number(e.target.parentElement.parentElement.id);
    let findCart = products.find(function (product) {
      return product.id === idAll;
    });
    if (objCarts[idAll]) {
      if(objCarts[idAll].amount >= objCarts[idAll].stock ){
        let res = confirm('Sorry, no more in stock')
      }else{
        objCarts[idAll].amount++
      }
    }else{
        objCarts[idAll] = {
            ...findCart,
            amount: 1,
        }
    }
    printCartProducts()
    printCartTotal()
  } 
});

carProducts.addEventListener('click',function(e){
 
      if(e.target.classList.contains('bx-plus')){
        let idAll = Number(e.target.parentElement.parentElement.id)
        if(objCarts[idAll].amount >= objCarts[idAll].stock ){
          let res = confirm('Sorry, no more in stock')
        }else{
          objCarts[idAll].amount++
        }
      }
      if(e.target.classList.contains('bx-trash')){
        let idAll = Number(e.target.parentElement.parentElement.id)
        let res = confirm('Do you want to delete this product?')
          if(res){
            delete objCarts[idAll]
          }
        
      }
      if(e.target.classList.contains('bx-minus')){
        let idAll = Number(e.target.parentElement.parentElement.id)
        if(objCarts[idAll].amount <= 1){
          let res = confirm('Do you want to delete this product?')
          if(res){delete objCarts[idAll]}
        }else{objCarts[idAll].amount--
        
        }
      }
      printCartProducts()
      printCartTotal()
})


